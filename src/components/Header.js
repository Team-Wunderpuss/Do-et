import React from 'react';
import './Header.scss';
import App from '../App'
export function Header({ username, handleLogout }) {

	function handleHome() {
		return (
			<App />
		)
	}

	function handleSidebar() {
		console.log("open sidebar menu");
	}

	return (
		<div className='header'>

			<h1>DO-ET</h1>
			{
				username.length > 1 &&
				<h4>{username}'s Do-Et List!</h4>
			}
			<div className='buttons'>
			<button id='home-btn' onClick={handleHome} >
				Home
			</button>
			<button id='sidebar' onClick={handleSidebar} >
				Menu
			</button>
			{
				username.length > 1 &&
				<button id='logout-btn' onClick={handleLogout}>
					Logout
				</button>
			}
			</div>
		</div>
	);
}
