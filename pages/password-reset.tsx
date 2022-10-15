import { ArrowBack } from "@mui/icons-material"
import { Alert, Button, Card, CircularProgress, IconButton } from "@mui/material"
import { AxiosError } from "axios"
import { FormConfirmPasswordInput, FormPasswordInput } from "components/FormInput"
import Layout from "components/Layout"
import { Api } from "helpers/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ApiResponse } from "Typing"

const Page = () => {
	const router = useRouter()
	const [state, setState] = useState<{ text?: string, status?: boolean, isValid?: boolean }>({})
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const _req = async () => {
		const token = router?.query?.token
		setLoading(true)
		try {
			const { data, status } = await Api().post<ApiResponse>('/password-reset', { token, password })
			setState({
				text: data.message,
				status: true,
				isValid: true,
			})
			setLoading(false)
			if (status === 200) {
				setTimeout(() => router.replace('/login'), 800)
			}
		} catch (error) {
			const err = (error as AxiosError<ApiResponse>)
			setState({
				text: err.response.data.message,
				isValid: err.response.status >= 500,
			})
			setLoading(false)
		}
	}
	useEffect(() => {
		if (router.isReady) {
			_req()
		}
	}, [router.isReady])

	return <Layout>
		<div className="min-h-[60vh] flex flex-col justify-center items-center p-2">
			<Card elevation={2} className='p-4 max-w-md w-full space-y-2'>
				<div className="flex w-full">
					<IconButton onClick={() => router.push('/forgot-password')}>
						<ArrowBack />
					</IconButton>
				</div>
				{state.text !== undefined && <Alert color={`${state.status ? 'success' : 'error'}`} icon={<></>}> {state.text} </Alert>}
				{state.isValid && <div className="space-y-2">
					<FormPasswordInput
						props={{
							title: 'Password',
							handleChange(s) { setPassword(s) },
							name: 'password',
							message: (password.length >= 8) ? '' : ".."
						}} />
					<FormConfirmPasswordInput
						props={{
							password: password,
							name: 'confirm_password',
							title: "Confirm Password"
						}} />
					<Button
						variant='outlined'
						size="small"
						disabled={loading}
						startIcon={loading && <CircularProgress size={14} />}
						onClick={_req}
					>
						RESET NOW
					</Button>
				</div>}
			</Card>
		</div >
	</Layout >
}

export default Page