import styled from 'styled-components';

export const MapGrid = styled.div`
	display: grid;
	grid-template-rows: 175px 34rem 50px;
	grid-template-columns: 25% 25% 25% 25%;
	grid-template-areas:
		'. header header .'
		'main main main main'
		'footer footer footer footer';
`;

export const PlaceHeader = styled.div`
	grid-area: header;
`;

export const PlaceGrid = styled.div`
	grid-area: main;
`;

export const PlaceNav = styled.div`
	grid-area: footer;
`;

// import styled from 'styled-components';

// export const HomeGrid = styled.div`
// 	display: grid;
// 	grid-template-rows: 175px 34rem 50px;
// 	grid-template-columns: 25% 25% 25% 25%;
// 	grid-template-areas:
// 		'. header header .'
// 		'main main main main'
// 		'footer footer footer footer';
// `;

// export const ItemA = styled.div`
// 	grid-area: header;
// `;

// export const ItemB = styled.div`
// 	grid-area: main;
// 	background: black;
// `;

// export const ItemC = styled.div`
// 	grid-area: footer;
// 	margin-top: 20px;
// 	margin-left: 10px;
// `;
