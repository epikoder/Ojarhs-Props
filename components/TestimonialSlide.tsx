import React from "react";
import { Testimony } from "../Typing.d";
typeof window !== "undefined" ? import("tw-elements") : " ";

type Testimonies = {
	testimony: Testimony[];
};

function TestimonialSlide({ testimony }: Testimonies) {	
	return (
		<div className="w-full lg:w-7/12 mb-4 lg:mb-0 border-t-0 p-4 shadow-gray-400 shadow-sm rounded">
			<h1 className='uppercase red font-md text-lg font-md text-center'>
				Testimonials
			</h1>

			<div
				id='carouselExampleSlidesOnly'
				className='carousel slide relative h-full w-full  border-l-600 border-t-o border-r-0 border-b-0 border-l-2 '
				data-bs-ride='carousel'
			>
				<div className='carousel-inner relative w-full overflow-hidden h-full'>
					{testimony.map((testimony, index) => (
						<div
							className={
								index === 0
									? "carousel-item active relative float-left w-full h-full"
									: "carousel-item relative float-left w-full h-full"
							}
							key={index}
						>
							<div className=' h-full p-4 flex flex-col '>
								<div className='text-gray-500 text-md'>{testimony.testimony}</div>
								<p className='red text-end  p-4 mt-12 flex-end space-x-1'> -
									{testimony.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default TestimonialSlide;
