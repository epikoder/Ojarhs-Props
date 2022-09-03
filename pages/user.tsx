import { useRouter } from "next/router"
import React from "react"

const user = () => {
    const router = useRouter()

    React.useEffect(() => {
        router.replace('/user/Dashboard')
    }, [router.isReady])
    return <></>
}
export default user