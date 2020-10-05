import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import styles from './Login.scss';

export function Login({ setIsSignedUp, setUsername, setUserID }) {
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
				console.log(data);
				const { username, id } = data.user;
				setUserID(id);
				console.log("LOGIN: ", id);
				setUsername(username);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		setName('');
		setPassword('');
	};

	const onSignIn = (googleUser) => {
		const profile = googleUser.getBasicProfile();
		// GET FIRST NAME
		const firstName = profile.getGivenName();
		console.log('firstName: ', firstName)
		// GET LAST NAME
		const lastName = profile.getFamilyName();
		console.log('lastName: ', lastName)
		// GET IMAGE URL
		const imageUrl = profile.getImageUrl();
		console.log('imageURL: ', imageUrl)
		// GET EMAIL
		const email = profile.getEmail();
		console.log('email: ', email)
		// add logic if they create a user with Oauth, don't allow them to sign in with a user/password.
		const id_token = googleUser.getAuthResponse().id_token;
		fetch('/user/oAuth', {
			method: 'POST',
			body: JSON.stringify({
				username: email,
				password: null,
				firstname: firstName,
				imgUrl: imageUrl,
				oAuth: true,
				id_token: id_token
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then()
	};

	useEffect (() => {
		gapi.signin2.render('g-signin2', {
			// 'scope': 'https://www.googleapis.com/auth/plus.login',
			'width': 200,
			'height': 50,
			'longtitle': false,
			'theme': 'light',
			'onsuccess': onSignIn
		});
	});


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
					<div id="g-signin2"></div>
			</div>
		</div>
	);
}

