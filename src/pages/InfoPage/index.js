import styled from 'styled-components';


export const InfoGrid = styled.div`
	display: grid;
	grid-template-rows: 180px 35rem 64px;
	grid-template-columns: 25% 25% 25% 25%;
	grid-template-areas: 
    	". header header ."
    	"main main main main"
    	"footer footer footer footer";
`;

export const ItemD = styled.div`
    grid-area: header;
	text-align: center;
    margin-top: 25px;
    font-size: 60px;
 
`;

export const ItemE = styled.div`
    grid-area: main;
    background: black;
    color: white;
	font-size: 15px;
	text-align: center;
    padding: 22px 10px 22px 10px;
    
`;

// export const ItemC = styled.div`
//     grid area: side;

// `;

export const ItemF = styled.div`
    grid-area: footer;
    margin-top: 19px;
    margin-left: 10px;

   	
`;
