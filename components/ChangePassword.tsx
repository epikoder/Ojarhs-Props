import { Button, CircularProgress, Dialog, DialogContent } from "@mui/material"
import { AxiosError } from "axios"
import { BlacReact, Cubit } from "blac"
import { Api } from "helpers/api"
import { cloneElement, FC, useState } from "react"
import { ApiResponse } from "Typing"
import { FormConfirmPasswordInput, FormPasswordInput } from "./FormInput"

class ChangePasswordState extends Cubit<boolean> {
	toggle = () => this.emit(!this.state)
}

export const { useBloc: useBlocChangePassword } = new BlacReact([new ChangePasswordState(false)])

export const useToggleChangePassword = () => {
	const [_, { toggle }] = useBlocChangePassword(ChangePasswordState)
	return toggle
}

const ChangePassword: FC<{ button?: JSX.Element }> = ({ button }) => {
	const [state, { toggle }] = useBlocChangePassword(ChangePasswordState)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<JSX.Element>()
	const toggleOpen = () => {
		if (state) {
			setForm({ password: '', new_password: '' })
			setLoading(false)
		}
		toggle()
	}
	const [form, setForm] = useState<{
		password: string
		new_password: string
	}>({
		password: '',
		new_password: ''
	})
	const submit = async () => {
		setMessage(undefined)
		setLoading(true)
		try {
			const { data } = await Api().post<ApiResponse>('/user/change-password', form)
			setMessage(<div className="text-sec text-center p-2">{data.message}</div>)
		} catch (error) {
			const err = error as AxiosError<ApiResponse>
			setMessage(<div className="text-red-500 text-center p-2">{(err.response).data.message}</div>)
		}
		setLoading(false)
	}

	return <>
		{
			button !== undefined
				? cloneElement(button, {
					...button.props,
					onClick: toggleOpen
				})
				: <Button
					variant="outlined"
					size="small"
					onClick={toggleOpen}>
					Change Password
				</Button>
		}
		<Dialog open={state} onClose={toggleOpen}>
			<DialogContent>
				<div className="space-y-2 max-w-sm">
					<div className="text-center">
						Change Password
					</div>
					{message}
					<FormPasswordInput
						props={{
							title: 'Current Password',
							handleChange(s) {
								setForm({ ...form, password: s })
							},
							name: 'password',
							requried: true
						}} />
					<FormPasswordInput
						props={{
							title: 'New Password',
							handleChange(s) {
								setForm({ ...form, new_password: s })
							},
							name: 'new_password',
							requried: true
						}} />
					<FormConfirmPasswordInput
						props={{
							title: 'Confirm Password',
							name: 'c_password',
							requried: true,
							password: form.new_password
						}} />
					<Button
						variant="outlined"
						size='small'
						disabled={loading}
						startIcon={loading && <CircularProgress size={14} />}
						onClick={submit}
					>
						CHANGE
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	</>
}
export default ChangePassword