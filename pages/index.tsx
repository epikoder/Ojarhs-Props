import Head from "next/head";
import React from "react";
import Plaza from "../components/Plaza";
import HomeSignUp from "../components/HomeSignUp";
import TopSection from "../components/TopSection";
import Notice from "../components/Notice";
import { PropertyAdvert } from "../components/Adverts";
import Testimonials from "../components/Testimonials";
import Layout from "../components/Layout";
import { loadAdverts, loadIndex, loadNotice } from "../actions";
import { RootState, useAppDispatch } from "../store";
import { CardLoader } from "../components/Loader";
import { useSelector } from "react-redux";
import { Search } from "../components/Search";
import { useRouter } from "next/router";
import { Card } from "@mui/material";
import Image from "next/image"
import { Carousel } from "react-responsive-carousel";
import Adverts from "./admin/adverts";
import { resolveFilePath } from "../helpers/helpers";


type indexSliderType = {
	postion: 'left' | 'right' | 'center'
	gravity: 'start' | 'center' | 'end'
	apiImage: boolean
	image: string
	text: string
	textColor?: string | JSX.Element
}
const IndexSlider = () => {
	const slides: indexSliderType[] = [
		{
			apiImage: false,
			postion: 'center',
			gravity: 'center',
			image: 'slider1.jpeg',
			text: 'Welcome to Ojarh plaza, pay for your office and warehouse'
		},
		{
			apiImage: false,
			postion: 'center',
			gravity: 'center',
			image: 'slider2.jpeg',
			text: ' Office, Shop, and warehouse available for rent at the heart of Anambra'
		},
		{
			apiImage: false,
			postion: 'center',
			gravity: 'center',
			image: 'slider3.jpeg',
			text: 'Signup and advertise your services'
		},
		{
			apiImage: false,
			postion: 'center',
			gravity: 'center',
			image: 'slider4.jpeg',
			text: 'Dont\' Have an account Signup Now!!'
		},
	]

	const ref = React.useRef<HTMLSpanElement[]>([])
	const _ = (index: number) => {
		const els: HTMLCollectionOf<HTMLSpanElement> = document.getElementsByClassName(index.toString() + '-slider') as HTMLCollectionOf<HTMLSpanElement>
		Array.from(Array(els.length).keys()).forEach(e => {
			if (ref.current !== undefined && ref.current !== null) {
				ref.current.forEach(k => {
					k.className = k.className.replaceAll('slide-in', '').trim()
				})
			}
			const el = els[e]
			el.className += ' slide-in'
		})
		ref.current = Array.from(Array(els.length).keys()).map(i => els[i])
	}

	return <Carousel
		onChange={_}
		showThumbs={false}
		showArrows={true}
		showStatus={false}
		autoPlay
		emulateTouch
		infiniteLoop
		transitionTime={1500}
		showIndicators
		stopOnHover
	>
		{slides.map((s, i) =>
			<div key={i} className="h-[40vh] md:h-[70vh] lg:h-[80vh] relative" style={{
				backgroundImage: `url(${s.apiImage ? resolveFilePath(s.image) : '/image/' + s.image})`,
				backgroundRepeat: 'no-repeat',
				objectFit: 'cover',
				backgroundSize: 'cover'
			}}>
				<div className={`${s.postion !== 'center' ? '' : 'items-center'} flex flex-col justify-${s.gravity} h-full w-full`} >
					<div className={`p-2 m-4 max-w-[50%] lg:max-w-[30%] absolute ${s.postion !== 'center' ? s.postion + '-10' : ''}`} style={{
						backgroundColor: '#0d0d0d89'
					}}>

						<div className="relative">
							<div className="w-1/2 bg-white h-2 absolute -top-3 -left-2"></div>
							<div className="w-2 bg-white h-[50%] absolute -top-3 -left-2"></div>
							<div className="w-1/2 bg-white h-2 absolute -bottom-3 -right-2"></div>
							<div className="w-2 bg-white h-[50%] absolute -bottom-3 -right-2"></div>
							<div className="p-2 lg:p-8">
								<span className={`${i.toString() + "-slider"} ${i === 0 ? 'slide-in' : ''} text-${s.textColor || ''}-500 ease-linear text-xl md:text-3xl slider`}
									style={{
										fontFamily: 'space grotesk'
									}}>{s.text}</span>
							</div>
						</div>

					</div>
				</div>
			</div>
		)
		}
	</Carousel >
}
function Home() {
	const dispatch = useAppDispatch();
	const { data, state } = useSelector((store: RootState) => store.indexSlice);
	const router = useRouter();

	React.useEffect(() => {
		dispatch(loadIndex({}));
	}, [dispatch]);

	return (
		<Layout>

			<div className='space-y-4'>
				<div >
					<IndexSlider />
				</div>
				<Card className='justify-center flex'>
					<div className='mx-4 w-full max-w-xl lg:max-w-4xl my-2'>
						<Search />
					</div>
				</Card>
				<TopSection />
				<HomeSignUp />
				{state === "pending" && <CardLoader />}
				{state === "failed" && (
					<div>
						<div className='text-center'>
							<span className='text-red-500'>ERROR</span> | Reload page
						</div>
					</div>
				)}
				{state === "success" && typeof data === "object" && (
					<>
						<Plaza name='plaza shops' store={data.shops} prop='' />
						<Notice />
						<Plaza name='plaza office' store={data.office} prop='' />
						<Card className='p-2 grid grid-cols-1 md:grid-cols-2'>
							<div className="text-center flex flex-col justify-center items-center py-4 md:p-0">
								<div className='uppercase text-lg font-semibold px-4'>
									About Ojarh <span className='text-red-500'>Properties</span>
								</div>
								<div className='p-4 max-w-[28rem]  lg:text-lg'>
									{`Ojarh Plaza is now open for you to rent and sell to your customers.
					            Our location remains the best and surely very accessible. Our
					            processes are automated for credibility and satisfaction`}
								</div>
							</div>
							<div className='relative md:w-[80%] rounded-lg overflow-hidden w-full h-[50vh] md:h-[50vh] mx-auto' style={{
								backgroundImage: "url('/image/aboutus.jpeg')",
								backgroundRepeat: "no-repeat",
								objectFit: "cover",
								backgroundSize: "cover",
							}}>
							</div>
						</Card>
						<PropertyAdvert />
						<Plaza name='plaza warehouse' store={data.warehouse} prop='' />
						<Plaza name='Services' store={data.services} prop='' />
						<Testimonials testimony={data.testimonies} />
					</>
				)}
			</div>

		</Layout>
	);
}

export default Home;
