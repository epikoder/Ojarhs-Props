import { Button, Card, TextField } from "@mui/material";
import React from "react";
import { Testimony } from "../Typing.d";
import TestimonialSlide from "./TestimonialSlide";



function Testimonials({ testimony }: { testimony: Testimony[] }) {
    return (
        <div>
            {/* Testimonies */}
            <div className="flex flex-col justify-center items-center my-2 lg:flex-row gap-5 rounded-lg overflow-hidden md:max-w-lg lg:max-w-full mx-auto">
                <TestimonialSlide testimony={testimony} />
                {/* Report  */}
                <Card className="max-w-md w-full flex flex-col space-y-2 p-4">
                    <h1>Review</h1>
                    <TextField
                        label='Subject'
                        variant="outlined"
                        size="small"
                        className="text-sm"
                        placeholder="Subject" />
                    <TextField
                        label='Review'
                        variant="outlined"
                        size="small"
                        className="text-sm"
                        placeholder="Review" />
                    <Button
                        variant="outlined"
                    >
                        SUBMIT
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default Testimonials;
