import { useRouter } from "next/router"
import React from "react"

const Admin = () => {
    const router = useRouter()

    React.useEffect(() => {
        router.replace('/admin/login')
    }, [router])
    return <></>
}
export default Admin