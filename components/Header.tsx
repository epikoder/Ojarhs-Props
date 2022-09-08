import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { openMenu, closeMenu, openState } from "../features/HeaderMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import NavLink from "./NavLink";
import { RootState } from "../store";

if (typeof window !== 'undefined') {
	window.document.onscroll = (e) => {
		if (window.scrollY >= 100) {
			window.document.getElementById('fixedTop').style.position = 'fixed'
		} else {
			window.document.getElementById('fixedTop').style.position = 'unset'
		}
	}
}

function Header() {
	const dispatch = useDispatch();
	const isOpen = useSelector(openState);
	const isAuthenticated = useSelector((store: RootState) => store.authSlice.authenticated)
	const [fixed, setFixed] = React.useState(false)


	return (
		<div id="fixedTop" style={{
			// top: 0,
			width: '100%',
			zIndex: 10000,
		}}>
			<div className="flex justify-center bg-black" >
				<div className='lg:p-4 lg:px-24 md:p-2 md:px-12 p-2 w-full sticky-top max-w-7xl' >
					<div>
						<div className='flex justify-between items-center text-sm'>
							<Link href='/'>
								<img
									src='/image/logo.png'
									className="h-16 w-24"
									alt='ojarh'
								/>
							</Link>
							<ul className='lg:flex items-center justify-between text-uppercase w-8/12 hidden'>
								<NavLink href='/'>
									<li className='active:text-red-600 a uppercase cursor-pointer  text-white hov duration-300 transition-all ease-in-out'>
										<a>Home</a>
									</li>
								</NavLink>
								<NavLink href='/properties'>
									<li className='text-white active:text-red-600 a uppercase cursor-pointer hov  duration-300 transition-all ease-in-out'>
										<a>Properties</a>
									</li>
								</NavLink>
								<NavLink href='/services'>
									<li className='text-white active:text-red-600 a uppercase cursor-pointer hov  duration-300 transition-all ease-in-out'>
										<a>Services</a>
									</li>
								</NavLink>
								<NavLink href='/about'>
									<li className='text-white uppercase hov active:text-red-600 a cursor-pointer  duration-300 transition-all ease-in-out'>
										<a>About us</a>
									</li>
								</NavLink>
								{
									isAuthenticated ? <>
										<NavLink href='/user/dashboard'>
											<li className='text-white uppercase hov cursor-pointer active:text-red-600 a duration-300 transition-all ease-in-out'>
												<a>Dashboard</a>
											</li>
										</NavLink>
									</> :
										<>
											<NavLink href='/login'>
												<li className='text-white uppercase hov cursor-pointer active:text-red-600 a duration-300 transition-all ease-in-out'>
													<a>Sign up/login</a>
												</li>
											</NavLink>
										</>
								}
							</ul>
							{isOpen ? (
								<XIcon
									onClick={() => dispatch(closeMenu())}
									className='h-7 w-7 text-white bg-red lg:hidden cursor-pointer'
								/>
							) : (
								<MenuIcon
									onClick={() => dispatch(openMenu())}
									className='h-7 w-7 text-white bg-red lg:hidden cursor-pointer'
								/>
							)}
						</div>
						{isOpen ? (
							<div className='w-full bg-black items-end space-y-2 mt-4 z-50'>
								<ul className='flex flex-col items-start justify-between text-uppercase w-6/12 lg:hidden space-y-3'>
									<NavLink href='/'>
										<li
											onClick={() => dispatch(closeMenu())}
											className='text-white  uppercase cursor-pointer '
										>
											Home
										</li>
									</NavLink>
									<NavLink href='/properties'>
										<li
											onClick={() => dispatch(closeMenu())}
											className='text-white  uppercase hov cursor-pointer '
										>
											Properties
										</li>
									</NavLink>
									<NavLink href='/services'>
										<li
											onClick={() => dispatch(closeMenu())}
											className='text-white  uppercase hov cursor-pointer '
										>
											Services
										</li>
									</NavLink>
									<NavLink href='/about'>
										<li
											onClick={() => dispatch(closeMenu())}
											className='text-white  uppercase hov cursor-pointer '
										>
											About us
										</li>
									</NavLink>
									{
										isAuthenticated ? <>
											<NavLink href='/user/dashboard'>
												<li
													onClick={() => dispatch(closeMenu())}
													className='text-white  uppercase hov cursor-pointer '
												>
													Dashboard
												</li>
											</NavLink>
										</> :
											<>
												<NavLink href='/login'>
													<li
														onClick={() => dispatch(closeMenu())}
														className='text-white  uppercase hov cursor-pointer '
													>
														Sign up/login
													</li>
												</NavLink>
											</>
									}
								</ul>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
