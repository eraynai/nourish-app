import React, { Component } from 'react';
import './MapPage.css';

import Map from '../../components/Map/Map';
import { MapGrid, PlaceGrid } from './index';

export default class DonationPage extends Component {
	render() {
		return (
			<MapGrid>
				<PlaceGrid>
					<Map />
				</PlaceGrid>
			</MapGrid>
		);
	}
}
