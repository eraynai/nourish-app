import styled from 'styled-components';

export const AuthGrid = styled.div`
	display: grid;
	grid-template-rows: 175px 60rem;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-areas: 
      ". header header ."
      "main main main main";
`;

export const ItemA = styled.div`
    grid-area: header;
`;

export const ItemB = styled.div`
    grid-area: main;
    background: black;
    padding-left: 15px;
    
`;