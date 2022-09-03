import { useRouter } from "next/router"
import React from "react"

const admin = () => {
    const router = useRouter()

    React.useEffect(() => {
        router.replace('/admin/Login')
    }, [router.isReady])
    return <></>
}
export default admin