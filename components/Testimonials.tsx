import React from "react";
import { Testimony } from "../Typing.d";
import Button from "./Button";
import TestimonialSlide from "./TestimonialSlide";



function Testimonials({ testimony}) {    
	return (
        <div>
            {/* Testimonies */}
            <div className="flex flex-col lg:flex-row gap-5 rounded-lg overflow-hidden md:max-w-lg lg:max-w-full mx-auto">
                <TestimonialSlide testimony={testimony} />


                {/* Report  */}
                <div className=" lg:w-5/12 flex flex-col space-y-2 bg-gray-100 border shadow-sm shadow-gray-400 p-4 rounded-lg">     
                <label htmlFor="" className="flex flex-col space-y-1" >
                <span>Subject</span>
                <input type="text" className=" border outline-none bg-gray-200 rounded-full p-1 text-gray-600 " / >
                </label>  
                <label htmlFor=""className="flex flex-col space-y-1 ">
                    <span> Message </span>
                    <textarea name="" id="" className="  outline-none bg-gray-200 text-gray-600 "></textarea>
                </label>

                <button className="bg-hov text-gray-600 w-4/12 mx-auto rounded-full px-2 py-1 hover:scale-110 active:scale-95" >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Testimonials;
