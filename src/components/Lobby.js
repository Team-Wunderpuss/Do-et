import React, { useState, useEffect } from 'react';
import { BucketList } from '../container/BucketList';
import { Header } from './Header';

export function Lobby({ username, setUsername, userID }) {
	//check states
	const [entry, setEntry] = useState('');
	const [entries, setEntries] = useState([]);

	//component did mount
	useEffect(() => {
		fetch(`/user/bucketList/${username}`)
			.then((response) => response.json())
			.then((data) => {
				const { err } = data;
				if (err) return;
				const entries = [];
				for (const entry in data) {
					entries.unshift(data[entry]);
				}
				setEntries(entries);
			});
	}, []);

	const handleBucketListEntry = (e) => {
		setEntry(e.target.value);
	};
	const handleAddItem = () => {
		const data = { username, userID, content: entry };
		//check
		fetch('http://localhost:3000/user/bucketList/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setEntries([data, ...entries]);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		setEntry('');
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:3000/user/bucketList/${id}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				const newEntries = entries.filter((entry) => {
					return entry._id !== data._id;
				});
				setEntries(newEntries);
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	};
	const handleDeleteAll = () => {
		fetch(`http://localhost:3000/user/bucketList/deleteAll/${username}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				setEntries([]);
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleAddItem();
		}
	};
	const handleLogout = () => {
		console.log('hit your logout');
		setUsername('');
		setEntries([]);
	};

	return (
		<div className='bucket-list-container'>
			<Header username={username} handleLogout={handleLogout} />
			<div className='bucket-list-entry'>
				<input
					type='text'
					value={entry}
					onChange={handleBucketListEntry}
					onKeyDown={handleKeyDown}
				/>
				<button id='share-btn' onClick={handleAddItem}>
					share
				</button>
			</div>
			{entries.length >= 1 && (
				<div className='delete-button-container'>
					<button id='delete-all-btn' onClick={handleDeleteAll}>
						delete all
					</button>
				</div>
			)}
			{entries.length > 0 && (
				<BucketList entries={entries} handleDelete={handleDelete} />
			)}
			{entries.length < 1 && <h4>Add another Bucket List Item!</h4>}
		</div>
	);
}
