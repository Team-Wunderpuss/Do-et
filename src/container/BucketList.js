import React from 'react';
import { Entry } from './Entry';
//Entries are the diary post, may need later

export function BucketList({ entries, handleDelete }) {
	const entriesJSX = entries.map((entry, idx) => {
		return (
			<Entry
				date={entry.date}
				content={entry.content}
				id={entry._id}
				key={idx}
				handleDelete={handleDelete}
			/>
		);
	});

	return <div className='bucket-list'>{entriesJSX}</div>;
}
