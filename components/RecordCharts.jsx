import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



function RecordCharts({active, free, activeVal, freeVal}) {	
	var series = [parseInt(activeVal), parseInt(freeVal)];
	var chartOptions = {
		labels: [active, free],
		colors: ["blue", "yellow"],	
		fill: {
			colors:["red", "blue"],
			type:"solid"
		}
	};

	return (
		<div className=' w-full h-4/12 shadow-gray-300 shadow-md mt-4 rounded-2xl'>
			<Chart series= {series}  type='pie' options={chartOptions} height={200} />
			<div className='mt-4 p-2 text-gray-300'>
				<p>{active} - {activeVal}</p>
				<p>{free} - {freeVal}</p>
			</div>
		</div>
	);
}

export default RecordCharts;
