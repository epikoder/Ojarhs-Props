import React, { useEffect, useState } from "react";

function CountDownTimer({date}) {
    const [time, setTime] = useState("")    
    const {year, month, day} = date    
    const data = ["Rent", "Electricity Service", "Garden Service"]
    var randomData = data[Math.floor(Math.random()*data.length)]
	var date_future = new Date(year, month, day)
    

    useEffect(() => {        
        setInterval(()=> {
           setTime(getTime())
        }, 1000)


	}, []);

	useEffect(() => {        
        setInterval(()=> {
           setTime(getTime())
        }, 60000)
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
        var seconds = delta % 60; // in theory the modulus is not required

        return `  Your ${randomData} Expires in ${days} days, ${hours} hours, ${minutes} minutes`;
    }   

	return <div>{time}</div>;
}

export default CountDownTimer;

