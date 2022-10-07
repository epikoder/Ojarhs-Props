import { Button, Card, CircularProgress, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Testimony } from "../Typing.d";
import TestimonialSlide from "./TestimonialSlide";



function Testimonials({ testimony }: { testimony: Testimony[] }) {
    const authenticated = useSelector((store: RootState) => store.authSlice.authenticated)
    const [form, setForm] = useState<{
        title: string,
        review: string
    }>({
        title: '',
        review: ''
    })
    const [loading, setLoading] = useState<boolean>(false)

    const send = () => {
        setLoading(true)
        try {

        } catch (error) {

        }
        setLoading(false)
    }
    return (
        <div>
            {/* Testimonies */}
            <div className="flex flex-col space-y-10 justify-center items-center lg:flex-row gap-5 rounded-lg overflow-hidden md:max-w-lg lg:max-w-full mx-auto my-20">
                <TestimonialSlide testimony={testimony} />
                {/* Report  */}
                <Card className="max-w-md w-full flex flex-col space-y-2 p-4">
                    <h1>Review</h1>
                    <TextField
                        label='Title'
                        variant="outlined"
                        size="small"
                        className="text-sm"
                        placeholder="Subject"
                        onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <TextField
                        label='Review'
                        variant="outlined"
                        size="small"
                        className="text-sm"
                        placeholder="Review"
                        onChange={(e) => setForm({ ...form, review: e.target.value })} />
                    {authenticated ? <Button
                        variant="outlined"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={14} />}
                        onClick={send}
                    >
                        SUBMIT
                    </Button>
                        :
                        <Link href={'/login'}>
                            <Button
                                variant="outlined"
                            >
                                LOGIN
                            </Button>
                        </Link>}
                </Card>
            </div>
        </div>
    )
}

export default Testimonials;
