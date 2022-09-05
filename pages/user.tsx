import { useRouter } from "next/router"
import React from "react"

const User = () => {
    const router = useRouter()

    React.useEffect(() => {
        router.replace('/user/dashboard')
    }, [router])
    return <></>
}
export default User