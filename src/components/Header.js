import React from 'react';
// import './Header.scss';
import App from '../App'
export function Header(props) {
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
				props.username > 1 &&
				<h4>{props.username}'s Do-Et List!</h4>
			}
			<button id='home-btn' onClick={handleHome} >
				Home
			</button>
			<button id='sidebar' onClick={handleSidebar} >
				Menu
			</button>
			{
				props.username > 1 &&
				<button id='logout-btn' onClick={props.handleLogout}>
					Logout
				</button>
			}
		</div>
	);
}
