import { Button } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import Layout from "../components/Layout"
import Loader from "../components/Loader"
import { Api } from "../helpers/api"

const Page = () => {
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState(undefined as 'Invalid' | 'NotFound' | 'Expired' | 'Success')

    const router = useRouter()
    React.useEffect(() => {
        if (!router.isReady) return
        const token = router.query.token
        if (token === undefined) setState('Invalid')
        const _req = async () => {
            try {
                setLoading(true)
                const { status } = await Api().post('/verification/verify?token=' + token)
                setLoading(false)
                setState('Success')
            } catch (error) {
                setLoading(false)
                switch (error.response.status) {
                    case 404:
                        return setState('NotFound')
                    case 400:
                        return setState('Invalid')
                    case 408:
                        return setState('Expired')
                }
            }
        }
        _req()
    }, [router.isReady])
    return <Layout>
        <div className="h-40vh">
            {!loading && <div className="h-[40vh] w-full py-4 flex justify-center">
                <div>
                    {state === 'Success' && <div>
                        <div className="uppercase my-4 text-blue-500">
                            Verification Successful
                        </div>
                        <div className="flex justify-center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => router.push('/login')}
                            >
                                CONTINUE TO LOGIN
                            </Button>
                        </div>
                    </div>}
                    {state === 'NotFound' && <div className="uppercase">
                        <div className="uppercase my-4 text-red-500">
                            USER NOT FOUND
                        </div>
                        <div className="flex justify-center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => router.push('/')}
                            >
                                HOME
                            </Button>
                        </div>
                    </div>}
                    {state === 'Invalid' && <div className="uppercase">
                        <div className="uppercase my-4 text-red-500">
                            INVALID TOKEN
                        </div>
                        <div className="flex justify-center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => router.push('/verify-request')}
                            >
                                RETRY
                            </Button>
                        </div>
                    </div>}
                    {state === 'Expired' && <div className="uppercase">
                        <div className="uppercase my-4 text-red-500">
                            TOKEN EXPIRED
                        </div>
                        <div className="flex justify-center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => router.push('/verify-request')}
                            >
                                RETRY
                            </Button>
                        </div>
                    </div>}
                </div>
            </div>}
            {loading && <div className="h-[40vh] w-full relative">
                <Loader />
            </div>}
        </div>
    </Layout>
}

export default Page