import React from "react";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";
import { Testimony } from "../Typing.d";
typeof window !== "undefined" ? import("tw-elements") : " ";

type Testimonies = {
	testimony: Testimony[];
};

function TestimonialSlide({ testimony }: Testimonies) {
	return (
		<div className="w-full lg:w-7/12 mb-4 lg:mb-0 border-t-0 p-4 shadow-gray-400 shadow-sm rounded">
			<h1 className='uppercase font-md text-sm font-md text-center'>
				What Our clients are saying
			</h1>

			<div
				id='carouselExampleSlidesOnly'
				className='carousel slide relative h-full w-full  border-l-600 border-t-o border-r-0 border-b-0 border-l-2 '
				data-bs-ride='carousel'
			>
				<Carousel>
					{testimony.map((t, i) => <div key={i}>
						<img src={resolveFilePath(t.photo)} alt="" />
						<div>
							{t.name}
						</div>
						<div>
							{t.testimony}
						</div>
					</div>)}
				</Carousel>
			</div>
		</div>
	);
}

export default TestimonialSlide;
