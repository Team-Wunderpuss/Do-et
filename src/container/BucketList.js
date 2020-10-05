import React from 'react';
import { Entry } from './Entry';
import './BucketList.scss';
//Entries are the diary post, may need later

export function BucketList({ entries, handleDelete }) {
	const entriesJSX = entries.map((entry, idx) => {
		console.log('in entry and idx is: ', idx)
		console.log('thi is ', entries[idx].id)
		return (
			<Entry
				// date={entry.date}
				content={`${entry.city}, ${entry.state}, ${entry.country}, ${entry.zipCode}`}
				id={entry.id}
				key={idx}
				handleDelete={handleDelete}
			/>
		);
	});

	return <div className='bucket-list'>{entriesJSX}</div>;
}
