import React, { useState } from 'react';
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
	ComboBoxInput,
	ComboBoxPopover,
	ComboBoxOption,
} from '@reach/combobox';
import { mapStyle } from '../../mapstyles';
import NourishLogo from '../Static/Icons/nourish_logo.png';
import Fridge from '../Static/Icons/fridge2.svg';

const libraries = ['places'];
const mapContainerStyle = { width: '67vw', height: '96vh' };

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
		googleMapsApiKey: 'AIzaSyB5PaxGZCM52I209G2FGzyhjdtAhpwfg1U',
		libraries,
	});

	const [markers, setMarkers] = useState([]);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';
	return (
		<React.Fragment>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
				onClick={(event) => {
					setMarkers((current) => [
						...current,
						{
							lat: event.latLng.lat(),
							lng: event.latLng.lng(),
							time: new Date(),
						},
					]);
				}}
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
					/>
				))}
			</GoogleMap>
		</React.Fragment>
	);
}
