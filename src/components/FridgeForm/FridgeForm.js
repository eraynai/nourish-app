import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
// export default class FridgeForm extends Component {

//     state = {
//         name: '',
//         address: '',
//         description: '',
//         imageUrl: '',
//     }

// 	render() {
// 		return (
// 			<React.Fragment>
// 				<h1>Test</h1>
// 			</React.Fragment>
// 		);
// 	}
// }

export default function FridgeForm() {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date());
	const [image, setImage] = useState('');

	return (
		<React.Fragment>
			<h1>Test</h1>
		</React.Fragment>
	);
}
