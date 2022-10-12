import React, { useEffect, useState } from "react";

function CountDownTimer({ data }) {
    
	const [time, setTime] = useState([]);	

    let d = new Date(data.created_at)
    let date = new Date(d.setMonth(d.getMonth() + data.duration))  
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDate().toString()      
        
    let date_future = new Date (`${year}/${month}/${day}`)
    
	useEffect(() => {
		setInterval(() => {
			setTime(getTime());
		}, 1000);
	}, []);

	useEffect(() => {
		setInterval(() => {
			setTime(getTime());
		}, 60000);
	});

	function getTime() {
		var date_now = new Date().getTime(); // get current time

		// get total seconds between the times
		var delta = Math.abs(date_future.getTime() - date_now) / 1000;

		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;

		// calculate (and subtract) whole hours
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;

		// calculate (and subtract) whole minutes
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;

		// what's left is seconds
		var seconds = Math.floor(delta % 60); // in theory the modulus is not required

		return [days, hours, minutes, seconds];
	}

	return (
		<div className="flex flex-col space-y-1 justify-center ">
        	{/*Your Shop Ojarh.com Plaza Shop A2 Expires at  */}
            <h1>Your {data.type} {data.name} Expires in:</h1>
			<div className="flex space-x-2">
            <div className="flex flex-col items-center justify-center"> 
                <span className="text-[.6rem] text-left  md:text-xs text-gray-400">Days</span>
                <div className="bold text-[1rem] md:text-[1.5rem] ">{time[0]} : </div>
            </div>

            <div className="flex flex-col items-center justify-center"> 
                <span className="text-[.6rem] text-left  md:text-xs text-gray-400">Hrs</span>
                <div className="bold text-[1rem] md:text-[1.5rem] ">{time[1]} : </div>
            </div>

            <div className="flex flex-col items-center justify-center"> 
                <span className="text-[.6rem] text-left  md:text-xs text-gray-400">Mins</span>
                <div className="bold text-[1rem] md:text-[1.5rem] ">{time[2]} </div>
            </div>           
            </div>
		</div>
	);
}

export default CountDownTimer;

