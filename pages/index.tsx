import Head from "next/head"
import React from "react";
import Plaza from "../components/Plaza";
import SignUp from "../components/SignUp";
import { offices, shops, warehouse, services, Testimony } from "../Data";
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
        <title>ojars</title>                        
      </Head>

     <Layout>
     <main className="space-y-4 mt-24">        
     <Link href="/Dashboard" className="mt-24 red"> Go to dashboard </Link>
        <TopSection />        
        <SignUp />
        <Plaza name="plaza shops" store={shops} />
        <Notice />
        <Plaza name="plaza office" store={offices}/>
        <Adverts />
        <Plaza name="plaza warehouse" store= {warehouse} />
        <Plaza name ="Services" store={services} />
        <Testimonials testimony={Testimony}/>            
      </main>
     </Layout>
      
     </div>
  );
}

export default Home