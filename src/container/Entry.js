import React from 'react';

export function Entry({ date, content, id, handleDelete }) {
	const newDate = new Date(date).toDateString();
	const [weather, handleWeather] = useState({});

	function handleWeather(city) {
		fetch(`/api/${city}`)
			.then(response => response.json())
			.then(data => console.log(data))
	}

	return (
		<div className='entry'>
			<p>{newDate}</p>
			<div className='entry-item'>
				<div>{content}</div>
				{/* {
					weather.city &&
					<div>{weather data}</div>
				} */}
				<button id='get-weather' onClick={() => handleWeather(city)} > </button>
				<button id='delete-btn' onClick={() => handleDelete(id)}>
					X
				</button>
			</div>
		</div>
	);
}
