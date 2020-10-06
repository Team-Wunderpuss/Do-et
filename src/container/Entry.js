import React, { useState } from 'react';
import './Entry.scss';


export function Entry({ date, content, id, handleDelete }) {
	// const newDate = new Date(date).toDateString();
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
		<div className='entry' id={id}>
			{/* <p>{newDate}</p> */}
			<div className='entry-item'>
				<div className="place-entry">{`${content.city}, ${content.state}, ${content.country}`}</div>
				{
					weather.description &&
					<div>{`Weather: ${weather.description}, Temperature(F): ${weather.temp}, Feels Like: ${weather.feelsLike}, Wind Speed: ${weather.windSpeed}`}</div>
				}
				<div className='buttons'>
				{
					!weather.description &&
					<button id='get-weather' onClick={() => handleWeather(content.city)} >Weather</button>
				}
				<button id='delete-btn' onClick={() => handleDelete(id)}>
					X
				</button>
				</div>
			</div>
		</div>
	);
}
