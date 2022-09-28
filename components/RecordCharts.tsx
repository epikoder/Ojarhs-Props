import React from "react";
import dynamic from "next/dynamic";
import { Card } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



function RecordCharts({ values, option }: {
	values: number[]
	option: ApexCharts.ApexOptions
}) {
	return (
		<Card className='w-full h-4/12 mt-4 rounded-2xl'>
			<Chart series={values} type='pie' options={option} height={200} />
		</Card>
	);
}

export default RecordCharts;
