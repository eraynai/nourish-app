import React from 'react';

export default function Delete(props) {
	return (
		<div>
			<input
				className='btn'
				onClick={() => props.getOneFridge(`${props.id}`)}
				type='submit'
				value='Delete'
			></input>
		</div>
	);
}
