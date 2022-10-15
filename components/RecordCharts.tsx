import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



function RecordCharts({ values, option }: {
	values: number[]
	option: ApexCharts.ApexOptions
}) {
	return (
		<div className='w-full h-4/12 p-2 rounded-2xl'>
			<Chart series={values} type='pie' options={{...option, theme: {
				mode: 'dark'
			}}} height={200} />
		</div>
	);
}

export default RecordCharts;
