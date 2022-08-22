import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { openMenu, closeMenu, openState } from "../features/HeaderMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import NavLink from "./NavLink";

function Header() {
	const dispatch = useDispatch();
	const isOpen = useSelector(openState);
	const router = useRouter();

	return (
		<div className=' bg-black lg:p-4 lg:px-24 md:p-2 md:px-12 p-2  fixed mb-10 top-0 w-full z-50'>
			<div className='flex justify-between items-center '>
				<a href='/'>
					<Image
						src='/image/logo.png'
						width={70}
						height={50}
						layout='fixed'
						alt='ojarh'
					/>
				</a>
				<ul className='lg:flex items-center justify-between text-uppercase w-6/12 hidden'>
					<NavLink href='/'>
						<li className='active:text-red-600 a uppercase cursor-pointer text-md text-white hov duration-300 transition-all ease-in-out'>
							<a>Home</a>
						</li>
					</NavLink>
					<NavLink href='/properties'>
						<li className='text-white active:text-red-600 a uppercase cursor-pointer hov text-md duration-300 transition-all ease-in-out'>
							<a>Properties</a>
						</li>
					</NavLink>
					<NavLink href='/About'>
						<li className='text-white uppercase hov active:text-red-600 a cursor-pointer text-md duration-300 transition-all ease-in-out'>
							<a>About us</a>
						</li>
					</NavLink>
					<NavLink href='/Login'>
						<li className='text-white uppercase hov cursor-pointer active:text-red-600 a text-mdduration-300 transition-all ease-in-out'>
							<a>Sign up/Login</a>
						</li>
					</NavLink>
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
								className='text-white  uppercase cursor-pointer text-md'
							>
								Home
							</li>
						</NavLink>
						<NavLink href='/properties'>
							<li
								onClick={() => dispatch(closeMenu())}
								className='text-white  uppercase hov cursor-pointer text-md'
							>
								Properties
							</li>
						</NavLink>
						<NavLink href='/About'>
							<li
								onClick={() => dispatch(closeMenu())}
								className='text-white  uppercase hov cursor-pointer text-md'
							>
								About us
							</li>
						</NavLink>
						<NavLink href='/Login'>
							<li
								onClick={() => dispatch(closeMenu())}
								className='text-white  uppercase hov cursor-pointer text-md'
							>
								Sign up/Login
							</li>
						</NavLink>
					</ul>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default Header;
