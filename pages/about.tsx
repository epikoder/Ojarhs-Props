import React from "react";
import Layout from "../components/Layout";

function About() {
	return (
		<Layout>
			<div className='flex flex-col justify-center items-center h-full'>
				<h1 className='red text-lg lg:text-3xl uppercase text-center mb-4'>
					About US
				</h1>
				<div className="max-w-xl p-4">
					OJARH.COM started in 2020, it is a well designed platform for Global
					wholesale business, and we strive to have a positive impact on
					suppliers, buyers, the economy and communities. The owners, investors,
					partners, vendors all geared to make it a global brand, a marketplace
					that confronts almost all hiccups in global wholesale business. MISSION
					STATEMENT To serve as a Marketplace that connects manufacturers,
					suppliers, buyers, and service providers around the world. To facilitate
					wholesale business between the suppliers and the buyers, to share and
					use our high valued innovative systems that reduced risk of doing global
					business to benefit our customers. To grow small businesses to the level
					of sustainability.
				</div>
			</div>
		</Layout>
	);
}

export default About;
