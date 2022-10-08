import { Button, Card, CircularProgress, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASEURL } from "../constants";
import { Api } from "../helpers/api";
import { getUserToken } from "../helpers/auth";
import { RootState } from "../store";



function Review() {
    const authenticated = useSelector((store: RootState) => store.authSlice.authenticated)
    const [form, setForm] = useState<{
        title: string,
        review: string
    }>({
        title: '',
        review: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<JSX.Element>()
    const send = async () => {
        setLoading(true)
        try {
            const res = await fetch(BASEURL + '/review', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    authorization: ((): string => {
                        const t = getUserToken()
                        if (t === undefined || t == null) return ""
                        return `Bearer ${t.access}`
                    })()
                }
            })
            switch (res.status) {
                case 200:
                    {
                        setMessage(<div className="text-white text-center bg-blue-500 rounded-md px-2 py-1">
                            Review submitted successfully
                        </div>)
                        setForm({
                            review: '',
                            title: ''
                        })
                        break
                    }
                case 400:
                    {
                        setMessage(<div className="text-white text-center bg-red-500 rounded-md px-2 py-1">
                            Form Error
                        </div>)
                        break
                    }
                default:
                    {
                        setMessage(<div className="text-white text-center bg-red-500 rounded-md px-2 py-1">
                            ERROR OCCURED
                        </div>)
                    }
            }
        } catch (error) {

        }
        setLoading(false)
    }
    return (
        <div>
            {/* Testimonies */}
            <div className="flex flex-col justify-center items-center lg:flex-row gap-5 rounded-lg overflow-hidden md:max-w-lg lg:max-w-full mx-auto my-20">
                <Card className="max-w-md w-full flex flex-col space-y-4 p-4">
                    <h1>Drop a report</h1>
                    <div>
                        {message}
                    </div>
                    <TextField
                        label='Title'
                        variant="outlined"
                        size="small"
                        className="text-sm"
                        value={form.title}
                        placeholder="Title"
                        onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <textarea
                        className="text-sm p-2 rounded-md bg-transparent border border-gray-300 h-32"
                        placeholder="Review"
                        value={form.review}
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

export default Review;
