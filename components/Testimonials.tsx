import { TextField } from "@mui/material";
import React from "react";
import { Testimony } from "../Typing.d";
import Button, { OjarhButton } from "./Button";
import TestimonialSlide from "./TestimonialSlide";



function Testimonials({ testimony }: { testimony: Testimony[] }) {
    return (
        <div>
            {/* Testimonies */}
            <div className="flex flex-col lg:flex-row gap-5 rounded-lg overflow-hidden md:max-w-lg lg:max-w-full mx-auto">
                <TestimonialSlide testimony={testimony} />
                {/* Report  */}
                <div className=" lg:w-5/12 flex flex-col space-y-2 bg-gray-100 border shadow-sm shadow-gray-400 p-4 rounded-lg">
                    <h1>Review</h1>
                    <TextField
                        label='Subject'
                        variant="outlined"
                        size="small"
                        className="w-4/5 text-sm"
                        placeholder="Subject" />
                    <TextField
                        label='Review'
                        variant="outlined"
                        size="small"
                        className="w-4/5 text-sm"
                        placeholder="Review" />
                    <OjarhButton text="Submit" className="hover:bg-transparent hover:text-red-500" />
                </div>
            </div>
        </div>
    )
}

export default Testimonials;
