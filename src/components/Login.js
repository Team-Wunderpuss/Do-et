import React, { useState } from 'react';
import { Header } from './Header';

export function Login({ setIsSignedUp, setUsername }) {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = () => {
		console.log('hit log in');
		const userInfo = {
			username: name.trim(),
			password: password.trim(),
		};
		fetch('/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo),
		})
			.then((response) => response.json())
			.then((data) => {
				const { username } = data;
				setUsername(username);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		setName('');
		setPassword('');
	};

	return (
		<div className='login'>
			<Header username={name}/>
			<h1>Welcome!</h1>
			<div className='login-container'>
				<h3>Welcome!</h3>
				<div className='username-container'>
					<p>Username: </p>
					<input type='text' value={name} onChange={handleNameChange} />
				</div>
				<div className='password-container'>
					<p>Password: </p>
					<input
						type='password'
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className='buttons'>
					<button id='login-signup-btn' onClick={() => setIsSignedUp(true)}>
						Sign Up
					</button>
					<button id='login-btn' onClick={handleLogin}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

