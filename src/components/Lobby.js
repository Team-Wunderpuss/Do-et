import React, { useState, useEffect } from 'react';
import { BucketList } from '../container/BucketList';
import { Header } from './Header';
import './Lobby.scss';

export function Lobby({ username, setUsername, userID }) {
	//check states
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');

	const [entries, setEntries] = useState([]);
	//component did mount
	useEffect(() => {
		console.log("LOBBY: ", userID);
		fetch(`/user/bucketList/${userID}`)
			.then((response) => response.json())
			.then((data) => {
				const { err } = data;
				if (err) return;
				console.log(data);
				for (const entry in data) {
					console.log(entry);
					console.log(data[entry]);
					setEntries(data[entry]);
				}
			});
	}, []);

	const handleCityEntry = (e) => {
		setCity(e.target.value);
	};
	const handleStateEntry = (e) => {
		setState(e.target.value);
	};
	const handleCountryEntry = (e) => {
		setCountry(e.target.value);
	};

	const handleAddItem = () => {
		const data = { username, city, state, country };
		fetch(`/user/bucketList/${userID}/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("I ADDED WHATS MY DATA: ", data);
				setEntries(data.lists);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		setCity('');
		setState('');
		setCountry('');
	};

	const handleDelete = (id) => {
		fetch(`/user/bucketList/${id}/${userID}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				if (!data.lists) {
					return setEntries([])
				};
				setEntries(data.lists);
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	};
	const handleDeleteAll = () => {
		fetch(`/user/bucketList/deleteAll/${userID}`, {
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
					value={city}
					onChange={handleCityEntry}
					onKeyDown={handleKeyDown}
				/>
				<input
					type='text'
					value={state}
					onChange={handleStateEntry}
					onKeyDown={handleKeyDown}
				/>
				<input
					type='text'
					value={country}
					onChange={handleCountryEntry}
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
