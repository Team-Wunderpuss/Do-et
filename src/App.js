import React, { useState } from 'react';
// import { hot } from 'react-hot-loader';
import { Lobby } from './components/Lobby';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Header } from './components/Header';
// import '../scss/application.scss';

function App() {
	const [isSignedUp, setIsSignedUp] = useState(false);
	const [username, setUsername] = useState('');

	//conditions to render components
	const showSignUpPage = isSignedUp && username.length < 1;
	const showLoginPage = !isSignedUp && username.length < 1;
	const showLobby = !isSignedUp && username.length > 1;

	return (
		<div className='app'>
			{showLobby && (
				<Lobby username={username} setUsername={setUsername} />
			)}
			{showSignUpPage && (
				<Signup setIsSignedUp={setIsSignedUp} setUsername={setUsername} />
			)}
			{showLoginPage && (
				<Login setIsSignedUp={setIsSignedUp} setUsername={setUsername} />
			)}
		</div>
	);
}




export default (App);
