import React from "react"
import { Button, CircularProgress } from "@mui/material"
import { ApiResponse, Service, Space } from "../Typing.d"
import { Api } from "../helpers/api"
import { fixSpace } from "../helpers/helpers"
import { AxiosError } from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useRouter } from "next/router"
import { PaystackConsumer } from "react-paystack"
import { pk_key } from "../constants"

const NotAvailable = 'NOT AVAILABLE'
const NotFound = 'NOT FOUND'
export const PayButton = ({ slug, type, disabled }: { slug: string, type: 'service' | 'space', disabled?: boolean }) => {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [message, setMessage] = React.useState<string>(undefined)
    const { authenticated, user, application } = useSelector((store: RootState) => store.authSlice)
    const router = useRouter()
    const [data, setData] = React.useState(undefined as Space | Service)

    const check = async () => {
        if (!authenticated || application !== 'verified') {
            sessionStorage.setItem('current', type === 'space' ? `/property/${slug}` : `/services?search=${slug}`)
            return router.push(!authenticated ? '/login' : '/user/dashboard')
        }

        setLoading(true)
        setMessage(undefined)
        try {
            const { data } = await Api().get<ApiResponse<Space | Service>>(`/${type === 'service' ? 'service' : 'property'}/${slug}`)
            setLoading(false)
            if (data.status === 'success') {
                if (type === 'service') {
                    const service = ({ ...data.data, type: 'service' } as Service)
                    return setData(service)
                }

                let space = fixSpace(data.data as Space)
                if (space.status === 'occupied') {
                    return setMessage(NotAvailable)
                }
                return setData(space)
            }
        } catch (error) {
            setLoading(false)
            let err = (error as AxiosError)
            setMessage(err.response.status === 404 ? NotFound : 'ERROR OCCURED')
        }
    }

    const pay = async (response: {
        message: string
        status: 'success' | 'failed',
        reference: string
    }) => {
        setLoading(true)
        setMessage(undefined)
        try {
            const { data } = await Api().post<ApiResponse>('/pay', JSON.stringify({
                type: type,
                reference: response.reference,
                provider: 'paystack',
                slug: slug,
            }))
            setData(undefined)
            setSuccess(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            const err = error as AxiosError
            switch (err.response.status) {
                case 404:
                    return setMessage('User / ' + (type === 'space' ? 'Property' : 'Service') + ' Not Found')
                case 409:
                    return setMessage('Duplicate Transaction')
                case 406:
                    return setMessage('TRANSACTION ERROR')
                case 403:
                    return setMessage('PROPERTY NOT AVAILABLE')
                default:
                    return setMessage('ERROR: MALFORMED REQUEST')
            }
        }
    }

    return <>
        {!success && <>
            {data === undefined && <Button variant="contained" sx={{
                borderRadius: 0,
                backgroundColor: 'transparent',
                color: 'black',
                transition: 'all .5s ease-in-out',
                border: 'solid 1px #00000022',
                ":hover": {
                    backgroundColor: 'red',
                    color: 'white'
                },
                ':disabled': {
                    backgroundColor: 'gray',
                    color: "white"
                }
            }}
                onClick={check}
                fullWidth
                disableElevation
                disabled={disabled || loading || message === NotAvailable}
                style={{ fontFamily: 'space grotesk' }}
                startIcon={loading && <CircularProgress size={14} sx={{
                    color: 'white',
                }} />}
            >
                {message ? message : (loading ? 'PLEASE WAIT...' : 'PAY')}
            </Button>}
            {data !== undefined && <PaystackConsumer
                publicKey={pk_key}
                lastname={user.lname}
                firstname={user.fname}
                email={user.email}
                amount={data.amount * 100}
                onSuccess={pay}
                metadata={{
                    tranx: {
                        type: type,
                        slug: slug,
                    },
                    custom_fields: []
                }}
            >
                {({ initializePayment }) => <Button variant="contained" sx={{
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    color: 'black',
                    transition: 'all .5s ease-in-out',
                    border: 'solid 1px #00000022',
                    ":hover": {
                        backgroundColor: 'red',
                        color: 'white'
                    },
                    ':disabled': {
                        backgroundColor: 'gray',
                        color: "white"
                    }
                }}
                    onClick={() => initializePayment()}
                    fullWidth
                    disableElevation
                    disabled={loading}
                    style={{ fontFamily: 'space grotesk' }}
                    startIcon={loading && <CircularProgress size={14} sx={{
                        color: 'white',
                    }} />}
                >
                    {message ? message : (loading ? 'PLEASE WAIT...' : 'PROCEED')}
                </Button>}
            </PaystackConsumer>}
        </>
        }
        {success &&
            <Button variant="contained"
                sx={{
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    color: '#1565c0',
                    transition: 'all .5s ease-in-out',
                    border: 'solid 1px #00000022',
                    ':hover': {
                        color: 'white'
                    }
                }}
                onClick={() => router.push('/user/' + (type === 'service' ? 'service' : 'dashboard'))}
                fullWidth
                disableElevation
                style={{ fontFamily: 'space grotesk' }}
                startIcon={loading && <CircularProgress size={14} sx={{
                    color: 'white',
                }} />}
            >
                {'SUCCESS: PROCEED TO DASHBOARD'}
            </Button>}
    </>
}