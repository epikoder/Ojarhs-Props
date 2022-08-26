import Head from "next/head"
import React from "react";
import Plaza from "../components/Plaza";
import HomeSignUp from "../components/HomeSignUp";
import { offices, shops, warehouse, services, testimony } from "../Data";
import TopSection from "../components/TopSection";
import Notice from "../components/Notice";
import Adverts from "../components/Adverts";
import Testimonials from "../components/Testimonials";
import Layout from "../components/Layout";
import { loadIndex } from "../redux";
import { RootState, useAppDispatch } from "../store";
import { CardLoader } from "../components/Loader";
import { useSelector } from "react-redux";


function Home() {
  const dispatch = useAppDispatch()
  const { data, state } = useSelector((store: RootState) => store.indexSlice)

  React.useEffect(() => {
    dispatch(loadIndex({}))
  }, [])

  return (
    <div >
      <Head>
        <title>ojarh</title>
      </Head>

      <Layout>
        <main className="space-y-4">
          {/* <Link href="/Dashboard" className="mt-24 red"> Go to dashboard </Link> */}
          <TopSection />
          <HomeSignUp />
          {state === 'pending' && <CardLoader />}
          {state === 'failed' && <div>
            <div className="text-center">
              <span className="text-red-500">ERROR</span> | Reload page
            </div>
          </div>}
          {state === 'success' && <>
            <Plaza name="plaza shops" store={data.shops} prop="" />
            <Notice />
            <Plaza name="plaza office" store={data.office} prop="" />
            <Adverts />
            <Plaza name="plaza warehouse" store={data.warehouse} prop="" />
            <Plaza name="Services" store={data.services} prop="" />
            <Testimonials testimony={data.testimonies} />
          </>}
        </main>
      </Layout>
    </div>
  );
}

export default Home