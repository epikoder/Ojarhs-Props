import { Button, Card, CircularProgress, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { Api } from "helpers/api";
import { emailValidator } from "helpers/validation";
import React from "react";
import { ApiResponse } from "Typing";
import Layout from "../components/Layout"

const Page = () => {
    const [message, setMessage] = React.useState<{ text?: string, status?: boolean }>({});
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const recover = async () => {
        setLoading(true)
        try {
            const { data } = await Api().get<ApiResponse>('/password-reset?email=' + email)
            setMessage({
                text: data.message,
                status: true
            })
        } catch (error) {
            setMessage({
                text: (error as AxiosError<ApiResponse>).response.data.message,
            })
        }
        setLoading(false)
    }

    return <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Card className='lg:w-5/12 sm:w-8/12 w-11/12 space-y-4 py-8 mx-auto p-4 my-4'>
                <div className='red text-center lg:text-2xl md:text-xl'>
                    Forgot Password
                </div>

                <div className={`text-center text-sm font-sans text-${message.status ? 'sec' : 'red-500'}`}>
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
                        error={emailValidator(email) !== undefined}
                        onChange={(e) => setEmail(e.target.value)} />


                    <div className="flex justify-end">
                        <Button
                            variant="outlined"
                            size="small"
                            disabled={loading || emailValidator(email) !== undefined || email === ""}
                            startIcon={loading && <CircularProgress size={14} />}
                            onClick={recover}
                        >
                            Recover
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    </Layout>
}
export default Page