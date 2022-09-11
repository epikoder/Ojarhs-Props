import Head from "next/head"
import React from "react";
import Plaza from "../components/Plaza";
import HomeSignUp from "../components/HomeSignUp";
import TopSection from "../components/TopSection";
import Notice from "../components/Notice";
import Adverts from "../components/Adverts";
import Testimonials from "../components/Testimonials";
import Layout from "../components/Layout";
import { loadIndex } from "../redux";
import { RootState, useAppDispatch } from "../store";
import { CardLoader } from "../components/Loader";
import { useSelector } from "react-redux";
import { Search } from "../components/Search";
import { useRouter } from "next/router";

function Home() {
  const dispatch = useAppDispatch()
  const { data, state } = useSelector((store: RootState) => store.indexSlice)
  const router = useRouter()

  React.useEffect(() => {
    dispatch(loadIndex({}))
  }, [dispatch])


  return (
    <div >
      <Layout>
        <div className="space-y-4">
          <TopSection />
          <div className="justify-center hidden md:flex bg-white">
            <div className='mx-4 max-w-xl lg:max-w-4xl my-2'>
              <Search />
            </div>
          </div>
          <HomeSignUp />
          {state === 'pending' && <CardLoader />}
          {state === 'failed' && <div>
            <div className="text-center">
              <span className="text-red-500">ERROR</span> | Reload page
            </div>
          </div>}
          {(state === 'success' && typeof (data) === 'object') && <>
            <Plaza name="plaza shops" store={data.shops} prop="" />
            <Notice />
            <Plaza name="plaza office" store={data.office} prop="" />
            <Adverts />
            <Plaza name="plaza warehouse" store={data.warehouse} prop="" />
            <Plaza name="Services" store={data.services} prop="" />
            <Testimonials testimony={data.testimonies} />
          </>}
        </div>
      </Layout>
    </div>
  );
}

export default Home