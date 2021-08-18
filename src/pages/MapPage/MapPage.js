import React, { Component } from 'react';
import './MapPage.css';
import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';
import { MapGrid, PlaceGrid, PlaceNav } from './index';

export default class DonationPage extends Component {
	render() {
		return (
			<MapGrid>
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
