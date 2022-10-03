import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import NavLink from "./NavLink";
import { RootState } from "../store";
import { checkIsAuthenticated, logout } from "../features/authSlice";
import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
import { resolveFilePath } from "../helpers/helpers";
import { Person } from "@mui/icons-material";
import { useRouter } from "next/router";


const MenuItemMobile = ({ title, href = '/' }: { title: string, href?: string }) => {
	const router = useRouter()
	const path = router.asPath.replace('/', (s: string, arr: number): string => {
		return arr === 0 ? '' : s
	}).split('/')
	let _href = ''
	if (path.length > 1) {
		_href = path[1]
	}
	const subPath = href.replace('/', (s: string, arr: number): string => {
		return arr === 0 ? '' : s
	}).split('/')
	return <>
		<div>
			<NavLink href={href} active={subPath.length > 1 && subPath[1] === _href}>
				<Button
					sx={{
						':hover': {
							backgroundColor: 'gray',
							color: 'white'
						}
					}}
					className="text-black"
					fullWidth
					size='large'
				>
					{title}
				</Button>
			</NavLink>
		</div>
	</>
}

const MainNav = () => <>
	<NavLink href={'/'}>
		<Button
			size='large'>
			Home
		</Button>
	</NavLink>
	<NavLink href='/properties'>
		<Button
			size='large'>
			Properties
		</Button>
	</NavLink>
	<NavLink href='/services'>
		<Button
			size='large'>
			Services
		</Button>
	</NavLink>
	<NavLink href='/page/about'>
		<Button
			size='large'>
			About us
		</Button>
	</NavLink>
	<NavLink href='/page/contact'>
		<Button
			size='large'>
			Contact Us
		</Button>
	</NavLink>
</>

const SideNav = ({ fullWidth = false }: { fullWidth?: boolean }) => <>
	<NavLink href={'/'}>
		<Button
			sx={{
				':hover': {
					backgroundColor: 'gray',
					color: 'white'
				}
			}}
			className="text-black"
			fullWidth={fullWidth}
			size='large'>
			Home
		</Button>
	</NavLink>
	<NavLink href='/properties'>
		<Button
			sx={{
				':hover': {
					backgroundColor: 'gray',
					color: 'white'
				}
			}}
			className="text-black"
			fullWidth={fullWidth}
			size='large'>
			Properties
		</Button>
	</NavLink>
	<NavLink href='/services'>
		<Button
			sx={{
				':hover': {
					backgroundColor: 'gray',
					color: 'white'
				}
			}}
			className="text-black"
			fullWidth={fullWidth}
			size='large'>
			Services
		</Button>
	</NavLink>
	<NavLink href='/page/about'>
		<Button
			sx={{
				':hover': {
					backgroundColor: 'gray',
					color: 'white'
				}
			}}
			className="text-black"
			fullWidth={fullWidth}
			size='large'>
			About us
		</Button>
	</NavLink>
	<NavLink href='/page/contact'>
		<Button
			sx={{
				':hover': {
					backgroundColor: 'gray',
					color: 'white'
				}
			}}
			className="text-black"
			fullWidth={fullWidth}
			size='large'>
			Contact Us
		</Button>
	</NavLink>
</>
function Header() {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const { authenticated: isAuthenticated, user } = useSelector((store: RootState) => store.authSlice)
	const router = useRouter()

	React.useEffect(() => {
		if (!isAuthenticated) dispatch(checkIsAuthenticated({}))
	}, [isAuthenticated])

	const closeMenu = () => setIsOpen(false)
	const openMenu = () => setIsOpen(true)

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar className="bg-black opacity-95 p-2" component={'nav'} >
				<Toolbar>
					<Box
						sx={{ flexGrow: 1 }}
					>
						<Link href='/'>
							<img
								src='/image/logo.png'
								className="h-16 w-24 cursor-pointer object-cover"
								alt='ojarh'
							/>
						</Link>
					</Box>
					<Box>
						<ul className='lg:flex items-center justify-between text-uppercase hidden'>
							<MainNav />
							{
								isAuthenticated ? <>
									<NavLink href='/user/dashboard'>
										<Button
											size='large'>
											dashboard
										</Button>
									</NavLink>
								</> :
									<>
										<NavLink href='/login'>
											<Button
												size='large'>
												Sign up / Login
											</Button>
										</NavLink>
									</>
							}
						</ul>
					</Box>
					<div className='h-7 w-7 lg:hidden cursor-pointer'>
						{isOpen ?
							<XIcon
								onClick={closeMenu}
							/>
							:
							<MenuIcon
								onClick={openMenu}
							/>}
					</div>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					variant="temporary"
					open={isOpen}
					onClick={closeMenu}
					sx={{
						display: { xs: 'block', lg: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: 'white' }
					}}
					ModalProps={{
						keepMounted: true,
					}}
				>
					<Toolbar className="bg-black" sx={{
						minHeight: 80
					}} />
					<Box className="mx-auto py-2 space-y-4 text-center flex flex-col items-center w-full">
						{isAuthenticated && user !== undefined ? <>
							<Avatar
								src={resolveFilePath(user.photo)}
								className={'h-32 w-32'}
							/>
							<Box className="w-full">
								<Divider />
								<MenuItemMobile title="Dasboard" href="/user/dashboard" />
								<MenuItemMobile title="Profile" href="/user/profile" />
								<MenuItemMobile title="Service" href="/user/service" />
								<MenuItemMobile title="Receipts" href="/user/receipt" />
								<MenuItemMobile title="Messages" href="/user/message" />
								<MenuItemMobile title="Disputes" href="/user/disputes" />
								<MenuItemMobile title="Report" href="/user/report" />
								<MenuItemMobile title="Adverts" href="/user/advert" />
								<MenuItemMobile title="Request pack out" href="/user/packout" />
								<Button sx={{
									":hover": {
										backgroundColor: 'red',
										color: 'white'
									},
									width: '100%',
									color: 'black'
								}}
									onClick={() => dispatch(logout())}>
									Logout
								</Button>
							</Box>
						</>
							:
							<>
								<Box className="w-full">
									<IconButton onClick={() => router.push('/login')}>
										<Person fontSize="large" className="text-black h-32" />
									</IconButton>
									<MenuItemMobile title="Login" href="/login" />
								</Box>
							</>
						}
					</Box>
					<Divider className="bg-gray-400" />
					<Box className="w-full py-2">
						<SideNav fullWidth />
					</Box>
				</Drawer>
			</Box>
		</Box>
	);
}

export default Header;
