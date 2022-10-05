import React from 'react'
import FT from './FT'
import { PhoneOutgoingIcon, LocationMarkerIcon, InboxIcon } from "@heroicons/react/outline"
import Image from 'next/image'
import Link from 'next/link'
import { OjarhAddress, OjarhEmail, OjarhPhone } from '../constants'


function Footer() {
    return (
        <div>
            {/* the red background with phone email and location  */}
            <div className='bg-red py-12 px-4 gap-2 grid grid-cols-3'>
                {/* no vex for the component name oh i no fit think of better name */}
                <FT icon={<PhoneOutgoingIcon className='w-8' />} title="Phone Number" details={<span>{OjarhPhone}</span>} />
                <FT icon={<LocationMarkerIcon className='w-8' />} title="Location" details={<span className='text-sm'>{OjarhAddress}</span>} />
                <FT icon={<InboxIcon className='w-8' />} title="Email Address" details={<Link href='#'><span className='text-sm'>{OjarhEmail}</span></Link>} />
            </div>

            <div className='flex justify-center bg-black'>
                <div className='bg-black opacity-90 h-full space-y-10 text-gray-300 py-4 grid grid-cols-2 md:grid-cols-3 text-center w-full lg:w-[80%]'>
                    <div className='my-3 flex flex-col items-center'>
                        <Image
                            src="/image/logo.png"
                            width={120}
                            height={80}
                            layout="fixed"
                            alt="logo"
                        />
                        <p>{OjarhAddress} </p>
                        <p>{OjarhPhone}</p>
                    </div>
                    <div className='space-y-3 flex flex-col items-center'>
                        <div className='bg-red w-40 h-1 mb-4'></div>
                        <Link href="/page/about" className=' font-mono text-lg'>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500  mb-2 border hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> About </h3>
                        </Link>
                        <Link href="/page/sales_policy" className=' cursor-pointer font-mono text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Sales policy </h3>
                        </Link>
                        <Link href="/page/policy" className=' cursor-pointer font-mono text-lg'>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500  mb-2 border hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Policy </h3>
                        </Link>
                        <Link href="/page/tenancy_agreement" className=' cursor-pointer font-mono text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Tenancy Agreement </h3>
                        </Link>

                    </div>
                    <div className='space-y-3 flex flex-col items-center'>
                        <div className='bg-red w-40 h-1 mb-4'></div>
                        <Link href="/page/tenancy_service_fee" className=' cursor-pointer font-mono text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Tenancy Service Fee </h3>
                        </Link>
                        <Link href="/page/terms" className=' cursor-pointer font-mono text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Terms and conditions </h3>
                        </Link>
                        <a href="https://ojarh.com" target={'_blank'} rel="noreferrer" className=' cursor-pointer text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Ojarh.com </h3>
                        </a>

                        <a href="#" target={'_blank'} rel="noreferrer" className=' cursor-pointer text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '>  Ojarhlogistics.com </h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer