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
import Link from "next/link";


function Home() {
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
          <Plaza name="plaza shops" store={shops} prop="" />
          <Notice />
          <Plaza name="plaza office" store={offices} prop="" />
          <Adverts />
          <Plaza name="plaza warehouse" store={warehouse} prop="" />
          <Plaza name="Services" store={services} prop="" />
          <Testimonials testimony={testimony} />
        </main>
      </Layout>
    </div>
  );
}

export default Home