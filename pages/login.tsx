import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { RootState, useAppDispatch } from "../store";
import { loginApi } from "../actions/auth";
import { useRouter } from "next/router";
import { checkIsAuthenticated } from "../features/authSlice";
import { Button, Card, Checkbox, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type LoginForm = {
	email: string
	password: string
}

function Login() {
	const dispatch = useAppDispatch();
	const router = useRouter()
	const theme = useTheme()
	const [isHidden, setIsHidden] = React.useState(true)
	const [remember, setRemember] = useState<boolean>(false);
	const [form, setForm] = useState<LoginForm>({
		email: '',
		password: ''
	} as LoginForm)
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
			if (user !== undefined && user.is_admin) return router.replace("/admin")
			router.replace('/user/dashboard')
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
			<div className="min-h-[60vh] flex flex-col items-center justify-center">
				<Card className='lg:w-4/12 sm:w-8/12 w-11/12 space-y-4 py-8 mx-auto p-4 my-4'>
					<div className='red text-center lg:text-2xl md:text-xl text-lg '>
						Login
					</div>

					<div className={`text-center text-sm font-sans text-${message.status ? 'blue' : 'red'}-500`}>
						{message.text !== undefined && message.text}
					</div>
					<form ref={formRef} onSubmit={e => e.preventDefault()} className="space-y-2 py-2 p-4 items-center justify-center">
						<TextField
							label='Email'
							variant="outlined"
							size="small"
							type={'email'}
							className="w-full text-sm"
							placeholder="Email"
							onChange={(s) => {
								setForm({
									...form, email: s.target.value as unknown as string
								})
							}} />
						<FormControl sx={{ m: 1, width: '100%', margin: 0 }} variant="outlined" size="small">
							<InputLabel>Password</InputLabel>
							<OutlinedInput
								type={!isHidden ? 'text' : 'password'}
								value={form.password}
								onChange={(s) => {
									setForm({
										...form, password: s.target.value as unknown as string
									})
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setIsHidden(!isHidden)}
											onMouseDown={() => setIsHidden(!isHidden)}
											edge="end"
										>
											{!isHidden ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
						<div className='flex justify-between items-center flex-col sm:flex-row space-y-2 sm:space-y-0'>
							<label
								className='form-check-label inline-block text-sm items-center'
								htmlFor='flexCheckDefault'
							>
								<Checkbox
									checked={remember}
									onChange={(e) => setRemember(!remember)}
								/>
								<span>Remember Me</span>
							</label>

							<Button
								sx={{
									fontSize: 12
								}}
								size='small'
								onClick={() => router.push('/forgot-password')}
							>
								Forgot password
							</Button>
						</div>

						<div className="w-full flex justify-center mx-auto">
							<Button
								variant="outlined"
								onClick={submit}
								disabled={status === 'pending'}
								startIcon={status === 'pending' && <CircularProgress size={14} />}
							>
								Login
							</Button>
						</div>

						<div className='mx-auto text-sm text-center text-gray-400 '>
							Dont have an account?{" "}
							<Button
								sx={{
									fontSize: 12
								}}
								size='small'
								onClick={() => router.push('/sign-up')}
							>
								SIGNUP
							</Button>
						</div>
						<div className='mx-auto text-sm text-center text-gray-400 '>
							Email Verification{" "}
							<Button
								sx={{
									fontSize: 12
								}}
								size='small'
								onClick={() => router.push('/verify-request')}
							>
								Verify Now
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</Layout>
	);
}

export default Login;
