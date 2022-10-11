import React from 'react'
import FT from './FT'
import Link from 'next/link'
import { OjarhAddress, OjarhEmail, OjarhPhone } from '../constants'
import { IconButton, Paper } from '@mui/material'
import { Logo } from './Logo'
import { Facebook, Inbox, Instagram, Phone, Place, Twitter } from '@mui/icons-material'


function Footer() {
    return (
        <div>
            {/* the red background with phone email and location  */}
            <div className='bg-red py-12 px-4 gap-2 grid grid-cols-3'>
                {/* no vex for the component name oh i no fit think of better name */}
                <FT icon={<Phone className='w-8' />} title="Phone Number" details={<span>{OjarhPhone}</span>} />
                <FT icon={<Place className='w-8' />} title="Location" details={<span className='text-sm'>{OjarhAddress}</span>} />
                <FT icon={<Inbox className='w-8' />} title="Email Address" details={<Link href='#'><span className='text-sm'>{OjarhEmail}</span></Link>} />
            </div>

            <Paper className='flex justify-center' sx={{
                backgroundColor: '#141313'
            }} >
                <div className='opacity-90 h-full space-y-10 text-gray-300 py-4 grid grid-cols-1 md:grid-cols-3 text-center w-full lg:w-[80%]'>
                    <div className='my-3 flex flex-col items-center'>
                        <Logo height={250} />
                        <div className='flex justify-evenly min-w-[120px]'>
                            <a href="https://facebook.com/ojarhproperties" target={'_blank'} rel="noreferrer">
                                <IconButton>
                                    <Facebook />
                                </IconButton>
                            </a>
                            <a href="https://twitter.com/ojarhproperties" target={'_blank'} rel="noreferrer">
                                <IconButton>
                                    <Twitter />
                                </IconButton>
                            </a>
                            <a href="https://instagram.com/ojaproperties" target={'_blank'} rel="noreferrer">
                                <IconButton>
                                    <Instagram />
                                </IconButton>
                            </a>
                        </div>
                    </div>
                    <div className='space-y-3 flex flex-col items-center'>
                        <div className='bg-red w-40 h-1 mb-4'></div>
                        <Link href="/page/about" className=' font-mono text-lg'>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500  mb-2 border hov transition-all duration-700 ease-in-out cursor-pointer '>
                                About
                            </h3>
                        </Link>
                        <Link href="/page/terms" className=' cursor-pointer font-mono text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Terms and conditions
                            </h3>
                        </Link>

                    </div>
                    <div className='space-y-3 flex flex-col items-center'>
                        <div className='bg-red w-40 h-1 mb-4'></div>
                        <Link href="/page/tenancy_service_fee" className=' cursor-pointer font-mono text-lg '>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Tenancy Service Fee
                            </h3>
                        </Link>
                        <a href="/pdf/daily_incident_report.pdf" download={'daily_incident_report.pdf'}>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Daily Incident Report
                            </h3>
                        </a>
                        <a href="/pdf/daily_report_member_tenant.pdf" download={'daily_report_member_tenant.pdf'}>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Daily Report Member Tenant
                            </h3>
                        </a>
                        <a href="/pdf/daily_report_non_member_tenant.pdf" download={'daily_report_non_member_tenant.pdf'}>
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Daily Report Non-Member Tenant
                            </h3>
                        </a>
                        <a href="https://ojarh.com" target={'_blank'} rel="noreferrer">
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Ojarh.com
                            </h3>
                        </a>

                        <a href="https://ojarhlogistics.com" target={'_blank'} rel="noreferrer">
                            <h3 className=' border-dashed pb-1 border-transparent border-b-gray-500 border mb-2 hov transition-all duration-700 ease-in-out cursor-pointer '>
                                Ojarhlogistics.com
                            </h3>
                        </a>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Footer