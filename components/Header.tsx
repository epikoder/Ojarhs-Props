import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { openMenu, closeMenu, openState } from "../features/HeaderMenu";
import Link from "next/link";
import NavLink from "./NavLink";
import { RootState } from "../store";
import { checkIsAuthenticated } from "../features/authSlice";

function Header() {
	const dispatch = useDispatch();
	const isOpen = useSelector(openState);
	const isAuthenticated = useSelector((store: RootState) => store.authSlice.authenticated)
	const [fixed, setFixed] = React.useState(false)

	let lsc = 0
	if (typeof window !== 'undefined') {
		const el = window.document.getElementById('fixedTop')
		lsc = window.scrollY || window.document.documentElement.scrollTop
		let sc = 0
		window.document.onscroll = (e) => {
			const csc = window.scrollY || window.document.documentElement.scrollTop
			if (csc > lsc) {
				sc = sc < -105 && window.scrollY <= 150 ? sc : sc - 5
				if (window.scrollY >= 150) sc = -100
				if (window.scrollY > 200) {
					el.style.transition = 'all 0.8s linear'
					el.style.transform = 'translateY(100px)'
					el.style.position = 'fixed'
					el.style.top = `${sc}px`
				} else {
					el.style.position = 'fixed'
				}
			} else {
				sc = sc > 0 ? sc : sc + 5
				el.style.position = sc >= 0 && window.scrollY <= 100 ? 'unset' : 'fixed'
				el.style.transform = ''
				if (window.scrollY < 10) {
					el.style.position = 'unset'
				}
			}
			lsc = csc <= 0 ? 0 : csc
		}
	}

	React.useEffect(() => {
		if (!isAuthenticated) dispatch(checkIsAuthenticated({}))
	}, [isAuthenticated])

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
									className="h-16 w-24 cursor-pointer"
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
								<NavLink href='/page/about'>
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
									<NavLink href='/page/about'>
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
