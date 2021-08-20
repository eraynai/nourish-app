import React, { Component } from 'react';
import './MapPage.css';
import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';
import { MapGrid, PlaceHeader1, PlaceGrid2, PlaceNav3 } from './index';
import MapHeader from '../../components/MapHeader/MapHeader';

export default class DonationPage extends Component {
	render() {
		return (
			<MapGrid>
				<PlaceHeader1>
				<MapHeader />
				</PlaceHeader1>
				<PlaceGrid2>
					<Map />
				</PlaceGrid2>
				<PlaceNav3>
					<Nav />
				</PlaceNav3>
			</MapGrid>
		);
	}
}
