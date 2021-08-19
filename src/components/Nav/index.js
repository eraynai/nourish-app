import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const NavOut = styled.nav`
	padding-top: 2rem;
	margin-left: 5rem;
`;

export const NavCon = styled.div`
	display: flex;
	justify-content: space-evenly;
	bottom: 10px;
	overflow: hidden;
	position: fixed;
	width: 100%;
`;

export const Links = styled(Link)`
	width: 100%;
	
`;

// .navbar {
// 	position: fixed;
// 	bottom: 10px;
// 	width: 100%;
// 	overflow: hidden;
//   }