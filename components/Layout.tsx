import Head from 'next/head';
import Script from 'next/script';
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Footer from './Footer'
import Header from './Header'
import Loader from './Loader';

function Layout(props: PropsWithChildren) {
  const { appState } = useSelector((store: RootState) => store.authSlice)

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Script src='/scripts/noimage.js'></Script>
      <Header />
      <div className='flex flex-col justify-between'>
        {appState === 'completed' ? <main>{props.children}</main> :
          <div className='mt-4 relative h-[40vh]'>
            <Loader />
          </div>}
        <Footer />
      </div>
    </div>
  )
}

export default Layout