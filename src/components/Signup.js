import React, { useState } from 'react';
import { Header } from './Header';
import './Signup.scss';

export function Signup({ setIsSignedUp, setUsername }) {
	const [name, setName] = useState('');
	const [passwordOne, setPasswordOne] = useState('');
	const [passwordTwo, setPasswordTwo] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handlePasswordOneChange = (e) => {
		setPasswordOne(e.target.value);
	};
	const handlePasswordTwoChange = (e) => {
		setPasswordTwo(e.target.value);
	};
	const handleSignup = () => {
		console.log('hit');
		if (name.trim().length < 1) return;
		if (passwordOne !== passwordTwo) {
			setPasswordOne('');
			setPasswordTwo('');
		}
		const userInfo = {
			username: name.trim(),
			password: passwordOne.trim(),
		};
		//look out for this fetch
		fetch('/user/signup', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo),
		})
			.then((response) => response.json())
			.then((data) => {
				const { username } = data;
				console.log('username: ', username);
				setUsername(username);
				setIsSignedUp(false);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<div className='signup'>
			{/* <Header username={name}/> */}
			<h1>Join DO-ET!</h1>
			<div className='signup-container'>
				<h3>Signup!</h3>
				<div className='username-container'>
					<p>Username:</p>
					<input type='text' value={name} onChange={handleNameChange} />
				</div>
				<div className='password1'>
					<p>Password:</p>
					<input
						type='password'
						value={passwordOne}
						onChange={handlePasswordOneChange}
					/>
				</div>
				<div className='password2'>
					<p>Re-type Password:</p>
					<input
						type='password'
						value={passwordTwo}
						onChange={handlePasswordTwoChange}
					/>
				</div>
				<div className='buttons'>
					<button id='signup-login-btn' onClick={() => setIsSignedUp(false)}>
						Login
					</button>
					<button id='signup-btn' onClick={handleSignup}>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
