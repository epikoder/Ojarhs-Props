import { Button, CircularProgress, TextField } from "@mui/material";
import React from "react";
import Layout from "../components/Layout"

const Page = () => {
    const [message, setMessage] = React.useState<{ text?: string, status?: boolean }>({});
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    return <Layout>
        <div className='lg:w-5/12 sm:w-8/12 w-11/12 space-y-4 py-8 bg-gray-100 mx-auto shadow-md shadow-gray-500  p-4 my-4'>
            <div className='red text-center lg:text-2xl md:text-xl '>
                Forgot Password
            </div>

            <div className={`text-center text-sm font-sans text-${message.status ? 'blue' : 'red'}-500`}>
                {message.text !== undefined && message.text}
            </div>
            <form onSubmit={e => e.preventDefault()} className="space-y-4 py-2 p-4 items-center justify-center">
                <TextField
                    label='Email'
                    variant="outlined"
                    size="small"
                    type={'email'}
                    className="w-full text-sm"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />


                <div className="flex justify-end">
                    <Button
                    variant="outlined"
                    size="small"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={14} /> : ''}
                >
                    Recover
                </Button>
                </div>
            </form>
        </div>
    </Layout>
}
export default Page