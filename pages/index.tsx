import React from "react";
import Plaza from "../components/Plaza";
import HomeSignUp from "../components/HomeSignUp";
import TopSection from "../components/TopSection";
import Notice from "../components/Notice";
import { PropertyAdvert } from "../components/Adverts";
import Testimonials from "../components/Testimonials";
import Layout from "../components/Layout";
import { loadAdverts, loadIndex } from "../redux";
import { RootState, useAppDispatch } from "../store";
import { CardLoader } from "../components/Loader";
import { useSelector } from "react-redux";
import { Search } from "../components/Search";
import { useRouter } from "next/router";
import { Card } from "@mui/material";
import Image from "next/image"
import Slider from "../components/Slider";

function Home() {
	const dispatch = useAppDispatch();
	const { data, state } = useSelector((store: RootState) => store.indexSlice);
	const router = useRouter();

	React.useEffect(() => {
		dispatch(loadIndex());
		dispatch(loadAdverts());
	}, [dispatch]);

	return (
		<div>
			<Layout>
				<div className='space-y-4'>
					<div >
						<Slider className="max-h-[80vh]" slider={true} />
					</div>
					<div className='justify-center md:flex bg-white'>
						<div className='mx-4 max-w-xl lg:max-w-4xl my-2'>
							<Search />
						</div>
					</div>
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
								<div className="text-center flex flex-col justify-center items-center">
									<div className='uppercase text-lg font-semibold px-4'>
										About Ojarh <span className='text-red-500'>Properties</span>
									</div>
									<div className='p-4 max-w-[28rem]  lg:text-lg text-slate-500'>
										{`Ojarh Plaza is now open for you to rent and sell to your customers.
					            Our location remains the best and surely very accessible. Our
					            processes are automated for credibility and satisfaction`}
									</div>
								</div>
								<div className="relative overflow-hidden md:rounded-r-lg md:w-[100%] rounded-lg h-[30vh]">
									<img src="/image/sign.jpg" className="object-cover w-full h-[30vh] md:h-full" />
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
		</div>
	);
}

export default Home;
