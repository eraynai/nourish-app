import React, { Component } from 'react';
import { PlaceHeader } from '../../pages/MapPage/index';

export default class MapAddress extends Component {
	render() {
		return (
			<React.Fragment>
				<PlaceHeader>
					<h1>Find a Fridge/Add a Fridge!</h1>
				</PlaceHeader>
			</React.Fragment>
		);
	}
}
