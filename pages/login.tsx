import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import Link from "next/link";
import Layout from "../components/Layout";
import { FormInput, FormPasswordInput } from "../components/FormInput";
import Loader from "../components/Loader";
import { RootState, useAppDispatch } from "../store";
import { loginApi } from "../redux/auth";
import { useRouter } from "next/router";
import { checkIsAuthenticated, clearErr } from "../features/authSlice";

type LoginForm = {
	email: string
	password: string
}

function Login() {
	const dispatch = useAppDispatch();
	const router = useRouter()
	const togglePasswordState = useSelector(TogglePasswordState);
	const [remember, setRemember] = useState<boolean>(false);
	const [form, setForm] = useState<LoginForm>({} as LoginForm)
	const [message, setMessage] = useState<{ text?: string, status?: boolean }>({});
	const formRef = useRef<HTMLFormElement>()
	const { authenticated, status, message: errMessage, user } = useSelector((store: RootState) => store.authSlice)

	useEffect(() => {
		localStorage.setItem('persist_auth', `${remember}`)
	}, [remember])

	React.useEffect(() => {
		if (authenticated) return
		dispatch(checkIsAuthenticated({}))
	}, [authenticated, dispatch])

	useEffect(() => {
		if (authenticated) setTimeout(() => {
			if (user !== undefined && user.is_admin) return router.replace("/admin/dashboard")
			const path = sessionStorage.getItem('current')
			router.replace(path !== null && (path !== '/login' && path !== '/sign-up' && !path.includes('/admin/')) ? path : '/user/dashboard')
		}, 200)
	}, [authenticated, router, user])

	React.useEffect(() => {
		setMessage({
			text: errMessage,
			status: status === 'success'
		})
	}, [errMessage, status])

	const submit = async () => {
		if (!formRef.current.checkValidity()) {
			return
		}
		setMessage({
			text: undefined,
		})
		dispatch(loginApi(form))
	}

	return (
		<Layout>
			<div className='lg:w-5/12 sm:w-8/12 w-11/12 mt-24 space-y-4 py-8 bg-gray-100 mx-auto shadow-md shadow-gray-500  p-4'>
				<h1 className='red text-center lg:text-3xl md:text-2xl text-2xl '>
					Login
				</h1>

				<div className={`text-center text-sm font-sans text-${message.status ? 'blue' : 'red'}-500`}>
					{message.text !== undefined && message.text}
				</div>
				<form ref={formRef} onSubmit={e => e.preventDefault()} className="space-y-4 py-2 p-4 items-center justify-center">
					<FormInput props={{
						title: 'Email',
						name: "email",
						type: 'email',
						required: true,
						handleChange: (s) => {
							setForm({
								...form, email: s as unknown as string
							})
						}
					}} />

					<FormPasswordInput props={{
						title: 'Password',
						name: "password",
						requried: true,
						hidden: togglePasswordState,
						handleChange: (s) => {
							setForm({
								...form, password: s as unknown as string
							})
						}
					}} />

					<div className='form-check flex justify-between md:items-center flex-col md:flex-row space-y-2 items-start'>
						<label
							className='form-check-label inline-block text-gray-500 text-sm items-center'
							htmlFor='flexCheckDefault'
						>
							<input
								className='form-check-input appearance-none h-5 w-5 border border-gray-300  rounded-sm bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
								type='checkbox'
								value=''
								id='flexCheckDefault'
								onChange={(e) => setRemember(!remember)}
							/>
							<span>Remember Me</span>
						</label>

						<Link href='#'>
							<div className='text-sm text-gray-500 cursor-pointer hover:text-red-600'>
								Forgot Password ?
							</div>
						</Link>
					</div>

					<div className="w-full flex">
						{status !== 'pending' ? <>
							<button
								type='submit'
								className="bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer duration-300 transition-all ease-in-out"
								onClick={submit}>
								Login
							</button>
						</> : <div className="relative bg-red mx-auto text-center py-1 px-2 rounded-full mt-4 w-48 h-10 text-white cursor-wait">
							<Loader />
						</div>}
					</div>

					<div className='space-x-4 mx-auto text-sm text-center text-gray-400 '>
						Dont have an account?{" "}
						<Link href='/sign-up' className='ml-1'>
							<span className='hov cursor-pointer'>Sign Up</span>
						</Link>
					</div>
				</form>
			</div>
		</Layout>
	);
}

export default Login;
