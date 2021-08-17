import React, { useState, useCallback, useRef } from 'react';
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
} from '@reach/combobox';
import { mapStyle } from '../../mapstyles';
import Fridge from '../../Static/Icons/fridge2.svg';
import { Address } from '../Map/index';
import '@reach/combobox/styles.css';
require('dotenv').config();

const libraries = ['places'];
const mapContainerStyle = {
	width: '100vw',
	height: '100vh',
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

	const onMapClick = useCallback((event) => {
		setMarkers((current) => [
			...current,
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';
	return (
		<React.Fragment>
			<Search panTo={panTo} />

			<GoogleMap
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
							<p>
								Food dropped off at {formatRelative(selected.time, new Date())}
							</p>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</React.Fragment>
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
					placeholder='Enter An Address'
				/>
				<ComboboxPopover>
					{status === 'OK' &&
						data.map(({ id, description }) => (
							<ComboboxOption key={id} value={description} />
						))}
				</ComboboxPopover>
			</Combobox>
		</Address>
	);
}
