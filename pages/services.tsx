import React, { useState } from "react";
import Layout from "../components/Layout";
import Plaza from "../components/Plaza";

function properties() {
	return (
		<Layout>
			<div className='w-full mt-24 space-y-10'>
				<h1 className='lg:text-3xl text-md red text-center'>All Services</h1>

				<Plaza name='Services' store={[]} prop='all' />
			</div>
		</Layout>
	);
}

export default properties;
