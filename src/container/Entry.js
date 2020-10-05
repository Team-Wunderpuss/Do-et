import React, { useState } from 'react';
import './Entry.scss';


export function Entry({ date, content, id, handleDelete }) {
	const newDate = new Date(date).toDateString();
	const [weather, setHandleWeather] = useState({});

	function handleWeather(city) {
		fetch(`/api/${city}`)
			.then(response => response.json())
			.then(data => {
				setHandleWeather(data);
			})
			.catch(err => console.log(err))
	}

	return (
		<div className='entry'>
			<p>{newDate}</p>
			<div className='entry-item'>
				<div className="place-entry">{`${content.city}, ${content.state}, ${content.country}, ${content.zipCode}`}</div>
				{
					weather.description &&
					<div>{`${weather.description}, ${weather.temp}, ${weather.feelsLike}, ${weather.windSpeed}`}</div>
				}
				{
					!weather.description &&
					<button id='get-weather' onClick={() => handleWeather(content.city)} >Get Current Weather</button>
				}
				<button id='delete-btn' onClick={() => handleDelete(id)}>
					X
				</button>
			</div>
		</div>
	);
}
