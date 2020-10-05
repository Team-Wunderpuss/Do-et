import React from 'react';

export function Entry({ date, content, id, handleDelete }) {
	const newDate = new Date(date).toDateString();
	return (
		<div className='entry'>
			<p>{newDate}</p>
			<div className='entry-item'>
				<textarea value={content}></textarea>
				<button id='delete-btn' onClick={() => handleDelete(id)}>
					X
				</button>
			</div>
		</div>
	);
}
