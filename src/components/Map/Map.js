import React from 'react';
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

const libraries = ['places'];
// const mapContainerStyle = { width: '67vw', height: '96vh' };
const mapContainerStyle = { width: '100vw', height: '100vh' };

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

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';
	return (
		<React.Fragment>
			<h1>Nourish</h1>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
			></GoogleMap>
		</React.Fragment>
	);
}
