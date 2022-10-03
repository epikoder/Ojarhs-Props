import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import Layout from "../../components/Layout"
import Loader from "../../components/Loader"
import Slider from "../../components/Slider"
import { money, resolveFilePath } from "../../helpers/helpers"
import { loadProperty } from "../../redux/property"
import { RootState, useAppDispatch } from "../../store"
import PlaceIcon from '@mui/icons-material/Place';
import PaymentIcon from '@mui/icons-material/Payment';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { loadIndex } from "../../redux"
import OjarhCard from "../../components/Card"
import { PayButton } from "../../components/PayButton"
import { Card } from "@mui/material"

const Details = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { data, status } = useSelector((store: RootState) => store.propertDetailSlice)
	const { data: indexData, state } = useSelector((store: RootState) => store.indexSlice)

	React.useEffect(() => {
		if (router.isReady && status !== 'pending') {
			dispatch(loadProperty(router.asPath.split("/").pop()))
		}
	}, [router.asPath])

	React.useEffect(() => {
		if (state !== 'success') { dispatch(loadIndex()) }
	}, [dispatch])

	return <Layout>
		<React.Fragment>
			<div className="mb-4">
				{status === 'pending' && <div className="relative min-h-screen w-full">
					<Loader />
				</div>}
				{status === 'success' && <div className="flex flex-col lg:flex-row lg:justify-around justify-center ">
					<div className="flex flex-col">
						<div className="hidden md:flex flex-col justify-center md:justify-around items-center 2xl:max-w-6xl lg:max-w-2xl">
							<div className="p-1 flex w-full">
								<Card className="2xl:h-[40vh] xl:h-[35vh] lg:h-[40vh] md:h-[35vh] h-[30vh] w-[70%]">
									<Slider images={data.galleries.concat(data.photo)} />
								</Card>
								<Card className="w-[30%] p-1 flex flex-col overflow-x-hidden overflow-y-scroll 2xl:h-[40vh] xl:h-[35vh] lg:h-[40vh] md:h-[35vh] h-[30vh]">
									{data.video_galleries.concat(data.video).map((e, i) =>
										<video key={i} className="rounded-sm mx-1 my-1 w-full" src={resolveFilePath(e)} controls playsInline />)
									}
								</Card>
							</div>
							<Card className="text-left h-full w-full">
								<div className="grid grid-cols-3 text-center items-center bg-red-600">
									<div className="text-xs text-white">
										<FullscreenIcon />
										<span className="uppercase mx-1">
											{data.size}
										</span>
									</div>
									<div className="text-xs uppercase text-white">
										{data.type}
									</div>
									<div className="text-xs text-white">
										<PaymentIcon />
										<span className="uppercase mx-1">
											{data.plan}
										</span>
									</div>
								</div>
								<div className="p-4">
									<div className="flex items-center">
										<div className="text-xl text-red-600" style={{
											fontFamily: 'Space Grotesk'
										}}>
											{money(data.amount)}
										</div>
										<div className={`p-1 mx-8 ${data.status === 'open' ? 'bg-red-500' : 'bg-gray-500'} text-white uppercase text-xs`}>
											{data.status === 'open' ? 'for rent' : 'not available'}
										</div>
									</div>
									<div className="text-lg" style={{
										fontFamily: 'Space Grotesk'
									}}>
										{data.name}
									</div>
									<div className="text-gray-500">
										<PlaceIcon fontSize="small" />
										{data.address}
									</div>
									<div className="ellipse three-lines">
										{data.description}
									</div>
								</div>
								<div>
									<PayButton disabled={data.status === 'occupied'} slug={data.slug} type='space' />
								</div>
							</Card>
						</div>
					</div>
					<div className="md:hidden">
						<div>
							<div className="h-[30vh]">
								<Slider images={data.galleries.concat(data.photo)} />
							</div>
							<div className="flex overflow-x-scroll p-1 bg-white rounded-md">
								{data.video_galleries.concat(data.video).map((e, i) =>
									<video key={i} className="rounded-sm mx-1 h-24" src={resolveFilePath(e)} controls playsInline />)
								}
							</div>
						</div>
						<div className="bg-white text-left m-1 h-full border border-gray-300">
							<div className="grid grid-cols-3 text-center items-center bg-red-600">
								<div className="text-xs text-white">
									<FullscreenIcon />
									<span className="uppercase mx-1">
										{data.size}
									</span>
								</div>
								<div className="text-xs uppercase text-white">
									{data.type}
								</div>
								<div className="text-xs text-white">
									<PaymentIcon />
									<span className="uppercase mx-1">
										{data.plan}
									</span>
								</div>
							</div>
							<div className="p-4">
								<div className="flex items-center justify-between">
									<div className="text-xl text-red-600" style={{
										fontFamily: 'Space Grotesk'
									}}>
										{money(data.amount)}
									</div>
									<div className={`p-1 ${data.status === 'open' ? 'bg-red-500' : 'bg-gray-500'} text-white uppercase text-xs`}>
										{data.status === 'open' ? 'for rent' : 'not available'}
									</div>
								</div>
								<div className="text-lg" style={{
									fontFamily: 'Space Grotesk'
								}}>
									{data.name}
								</div>
								<div className="text-gray-500">
									<PlaceIcon fontSize="small" />
									{data.address}
								</div>
								<div className="ellipse three-lines">
									{data.description}
								</div>
							</div>
							<div>
								<PayButton disabled={data.status === 'occupied'} slug={data.slug} type='space' />
							</div>
						</div>
					</div>
					<div className="lg:hidden">
						{
							state === 'success' && <div className="w-[95vw] flex lg:flex-col overflow-x-scroll">
								{indexData.shops.slice(0, 4)
									.concat(indexData.office.slice(0, 4))
									.concat(indexData.warehouse.slice(0, 4))
									.map((s, i) =>
										<div className="mx-2" key={i}>
											<OjarhCard className="w-[90vw] sm:w-[60vw] md:w-70" data={s} />
										</div>)}
							</div>
						}
					</div>
					<div className="hidden lg:block overflow-y-scroll h-[65vh]">
						{
							state === 'success' && <div className="grid xl:grid-cols-2 gap-1">
								{indexData.shops.slice(0, 4)
									.concat(indexData.office.slice(0, 4))
									.concat(indexData.warehouse.slice(0, 4))
									.map((s, i) =>
										<div className="mx-2" key={i}>
											<OjarhCard className="lg:w-70 xl:w-80" data={s} />
										</div>)}
							</div>
						}
					</div>
				</div>}
				{status === 'failed' && <div>
					404
				</div>}
			</div>
		</React.Fragment>
	</Layout>
}

export default Details