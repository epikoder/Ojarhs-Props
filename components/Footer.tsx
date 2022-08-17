import React from 'react'
import FT from './FT'
import { PhoneOutgoingIcon, LocationMarkerIcon, InboxIcon } from "@heroicons/react/outline"
import Image from 'next/image'
import Link from 'next/link'


function Footer() {
  return (
    <div>
        {/* the red background with phone email and location  */}
        <div className='bg-red py-12 px-4 justify-evenly space-y-8  flex flex-col lg:flex-row mt-12'>            
            {/* no vex for the component name oh i no fit think of better name */}
            <FT icon={<PhoneOutgoingIcon/>} title="Phone Number" details="09074086235"  />
            <FT icon={<LocationMarkerIcon/>} title="Ikeja" details="ojars, Nigeria"  />
            <FT icon={<InboxIcon/>} title="Email Address" details={<Link href='#'>ezomonglory@gmail.com</Link>}  />
        </div>

        <div className='bg-black opacity-90 h-full space-y-10 text-gray-300 flex flex-col lg:flex-row justify-evenly items-center py-4'>
            <div>
                <Image 
                src="/image/logo.png"
                width={140}
                height={140}
                layout="fixed"
                alt="logo"
                />
                <p >23, joseph street, ikeja, Lagos </p>
                <p>08056728846</p>
            </div>
            <div className='space-y-3'>
                <div className='bg-red w-40 h-1 mb-4'></div>
                <Link href="" className=' cursor-pointer font-mono text-lg'><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500  mb-2 border hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> policy </h3></Link>

                <Link href="" className=' cursor-pointer font-mono text-lg '><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Sales policy </h3></Link>

                <Link href="" className=' cursor-pointer font-mono text-lg '><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '>  Tenants service fees </h3></Link>

                <Link href="" className=' cursor-pointer font-mono text-lg '><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Tenants agreements </h3></Link>
               
            </div>
            
            <div className='space-y-3'>
                <div className='bg-red w-40 h-1 mb-4'></div>
                <Link href="/About" className=' font-mono text-lg'><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500  mb-2 border hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> About </h3></Link>

                <Link href="" className=' cursor-pointer font-mono text-lg '><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Ojarh.com </h3></Link>

                <Link href="" className=' cursor-pointer font-mono text-lg '><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '>  Ojarhlogistics </h3></Link>

                <Link href="/T&C" className=' cursor-pointer font-mono text-lg '><h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hover:pl-2 hov transition-all duration-700 ease-in-out cursor-pointer '> Terms and conditions </h3></Link>
               
            </div>
        </div>
    </div>
  )
}

export default Footer