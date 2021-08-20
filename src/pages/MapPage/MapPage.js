import React, { Component } from 'react';
import './MapPage.css';
import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';
import { MapGrid, PlaceGrid, PlaceNav } from './index';
import MapHeader from '../../components/MapHeader/MapHeader';

export default class DonationPage extends Component {
	render() {
		return (
			<MapGrid>
				<MapHeader />
				<PlaceGrid>
					<Map />
				</PlaceGrid>
				<PlaceNav>
					<Nav />
				</PlaceNav>
			</MapGrid>
		);
	}
}
