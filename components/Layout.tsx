import Head from 'next/head';
import Script from 'next/script';
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Footer from './Footer'
import Header from './Header'
import Loader, { PageLoader } from './Loader';
import { CopyRight } from './Copyright';

function Layout(props: PropsWithChildren) {
  const { appState } = useSelector((store: RootState) => store.authSlice)

  return (
    <div className='duration-300 ease-in-out transition-all' style={{
      backgroundColor: '#edf3f8'
    }}>
      <Head>
        <title>Ojarh Properties</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />
      </Head>
      <Script src='/scripts/noimage.js'></Script>
      <Header />
      <PageLoader />
      <div className='flex flex-col justify-between min-h-[100vh]'>
        {appState === 'completed' ? <main>{props.children}</main> :
          <div className='mt-4 relative h-[40vh]'>
            <Loader />
          </div>}
        <Footer />
      </div>
      <CopyRight className='bg-red text-white' />
    </div>
  )
}

export default Layout