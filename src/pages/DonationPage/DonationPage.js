import React, { Component } from 'react';

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
