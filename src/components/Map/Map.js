import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
	GoogleMap,
	Marker,
	InfoWindow,
	useLoadScript,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxOption,
	ComboboxList,
} from '@reach/combobox';
import { mapStyle } from '../../mapstyles';
import Fridge from '../../Static/assets/mapFridge.png';
import Compass from '../../Static/Icons/compass_white.svg';
import { Address, CompassIcon } from '../Map/index';
import '@reach/combobox/styles.css';
import FridgeForm from '../FridgeForm/FridgeForm';

require('dotenv').config();

const libraries = ['places'];
const mapContainerStyle = {
	width: '100vw',
	height: '79vh',
};

const center = {
	lat: 43.653225,
	lng: -79.383186,
};

const options = {
	styles: mapStyle,
	disableDefaultUI: true,
	zoomControl: true,
};

export default function Map() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	const [markers, setMarkers] = useState([]);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		let jwt = localStorage.getItem('token');
		fetch('/api/fridges', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + jwt,
			},
		})
			.then((fetchResponse) => {
				return fetchResponse.json();
			})
			.then((events) => {
				let _events = events
					.filter((event) => event.lat && event.lng && event.time)
					.map((event) => ({
						...event,
						submitted: true,
						time: new Date(event.time),
					}));
				console.log(_events);
				setMarkers(_events);
			});
	}, []);

	const onMapClick = useCallback((event) => {
		setMarkers((current) => [
			...current,
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
				submitted: false,
			},
		]);
	}, []);

	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(16);
	}, []);

	const updateMarker = ({ name, address, lat, lng, date, description }) => {
		let ms = [...markers];
		let marker = ms.find((m) => m.lat === lat && m.lng === lng);
		marker.submitted = true;
		marker.name = name;
		marker.address = address;
		marker.description = description;
		marker.date = date;
		setMarkers(ms);
	};

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';
	return (
		<React.Fragment>
			<Search panTo={panTo} setMarkers={setMarkers} />
			<Locate panTo={panTo} />

			<GoogleMap
				className='map'
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{markers.map((marker) => (
					<Marker
						key={marker.time}
						position={{ lat: marker.lat, lng: marker.lng }}
						icon={{
							url: Fridge,
							scaledSize: new window.google.maps.Size(30, 30),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(15, 15),
						}}
						onClick={() => {
							setSelected(marker);
						}}
					/>
				))}
				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<div>
							<h2>Food Box Details:</h2>
							{selected.submitted ? (
								<>
									<p>Company Name: {selected.name}</p>
									<p>Fridge Address: {selected.address}</p>
									<p>Date: {selected.date}</p>
									<p>Description: {selected.description}</p>
								</>
							) : (
								<FridgeForm fridges={selected} updateMarker={updateMarker} />
							)}
							<p>Created: {formatRelative(selected.time, new Date())}</p>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</React.Fragment>
	);
}

function Locate({ panTo }) {
	return (
		<CompassIcon>
			<img
				src={Compass}
				alt='compass icon'
				onClick={() => {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							panTo({
								lat: position.coords.latitude,
								lng: position.coords.longitude,
							});
						},
						() => null,
						options
					);
				}}
			/>
		</CompassIcon>
	);
}

function Search({ panTo }) {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 43.653225, lng: () => -79.383186 },
			radius: 200 * 1000,
		},
	});

	return (
		<Address>
			<Combobox
				onSelect={async (address) => {
					setValue(address, false);
					clearSuggestions();
					try {
						const result = await getGeocode({ address });
						const { lat, lng } = await getLatLng(result[0]);
						panTo({ lat, lng });
					} catch (error) {
						console.log('error!');
					}
					// console.log(address);
				}}
			>
				<ComboboxInput
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					disabled={!ready}
					placeholder='Search A Drop Off Location'
				/>
				<ComboboxPopover>
					<ComboboxList>
						{status === 'OK' &&
							data.map(({ id, description }) => (
								<ComboboxOption key={id} value={description} />
							))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</Address>
	);
}
