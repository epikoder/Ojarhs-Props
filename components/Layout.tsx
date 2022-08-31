import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { checkIsAuthenticated } from '../features/authSlice';
import { RootState, useAppDispatch } from '../store';
import Footer from './Footer'
import Header from './Header'
import Loader from './Loader';

function Layout(props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { authenticated, appState } = useSelector((store: RootState) => store.authSlice)
  const indx = useSelector((store: RootState) => store.indexSlice)

  useEffect(() => {
    if (authenticated) return
    localStorage.setItem('current', router.pathname)
    dispatch(checkIsAuthenticated())
  }, [])

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
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