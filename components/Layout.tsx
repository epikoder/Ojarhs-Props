import Head from 'next/head';
import Script from 'next/script';
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Footer from './Footer'
import Header from './Header'
import Loader, { PageLoader } from './Loader';
import { CopyRight } from './Copyright';
import { Box, Card, Toolbar, useTheme } from '@mui/material';

function Layout(props: PropsWithChildren) {
  const { appState } = useSelector((store: RootState) => store.authSlice)
  const theme = useTheme()

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.default,
      width: '100vw'
    }} className='duration-300 ease-in-out transition-all'>
      <Head>
        <title>Ojarh Properties</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" crossOrigin='anonymous' />
      </Head>
      <Script src='/scripts/noimage.js'></Script>
      <Header />
      <PageLoader />
      <Box component={'main'}>
        <Toolbar />
        <div className='flex flex-col items-stretch flex-1 justify-between min-h-[100vh] pt-5 lg:pt-2'>
          {appState === 'completed' ? <main className='min-h-[60vh]'>{props.children}</main> :
            <div className='mt-4 relative h-[40vh]'>
              <Loader />
            </div>}
          <Footer />
        </div>
      </Box>
      <CopyRight className='bg-red text-white' />
    </Card>
  )
}

export default Layout