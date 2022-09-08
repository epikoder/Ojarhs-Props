import { useRouter } from "next/router"
import React from "react"
import Layout from "../../components/Layout"
import Loader from "../../components/Loader"

const Details = () => {
	const router = useRouter()
	const [loading, setLoading] = React.useState(false)
	React.useEffect(() => {
		if (router.isReady && loading) return
		setLoading(true)
		setTimeout(async () => {
			setLoading(false)
		}, 3000)
	}, [router.isReady])
	return <Layout>
		<React.Fragment>
			<div className="text-center">
				{loading && <div className="relative min-h-screen w-full">
					<Loader />
				</div>}
			</div>
		</React.Fragment>
	</Layout>
}

export default Details