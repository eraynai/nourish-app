import styled from 'styled-components';

export const MapGrid = styled.div`
	display: grid;
	grid-template-rows: 100px 1fr 100px;
`;

export const PlaceGrid = styled.div`
	grid-row-start: 2;
	grid-row-end: 3;
`;

export const PlaceNav = styled.div`
	grid-row-start: 3;
	grid-row-end: 4;
`;