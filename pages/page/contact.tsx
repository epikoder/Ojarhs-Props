import { Mail, Phone, Place } from "@mui/icons-material";
import { Alert, Button, CircularProgress, Paper, TextField } from "@mui/material";
import React from "react";
import { Parallax } from "react-parallax";
import Layout from "../../components/Layout";
import { BASEURL, OjarhAddress, OjarhEmail, OjarhPhone } from "../../constants";
import { emailValidator } from "../../helpers/validation";
import { Contact } from "../../Typing";

const Page = () => {
	const [form, setForm] = React.useState<Contact>({
		email: '',
		message: '',
		name: '',
		phone: '',
		subject: ''
	})
	const [loading, setLoading] = React.useState<boolean>(false)
	const [message, setMessage] = React.useState<JSX.Element>()

	const send = async () => {
		setLoading(true)
		try {
			const res = await fetch(BASEURL + '/contactus', {
				method: 'POST',
				body: JSON.stringify(form)
			})
			setLoading(false)
			switch (res.status) {
				case 400:
					{
						return setMessage(<>
							<Alert icon={<></>} color='error'>
								Form Error
							</Alert>
						</>)
					}
				case 200:
					{
						return setMessage(<>
							<Alert icon={<></>} color='success'>
								{`Thank you, We'll get back to you via email`}
							</Alert>
						</>)
					}
				default:
					{
						return setMessage(<>
							<Alert icon={<></>} color="error">
								ERROR OCCURED
							</Alert>
						</>)
					}
			}
		} catch (error) {
		}
		setLoading(false)
	}

	return (
		<Layout>
			<Paper className='font-light w-full'>
				<Parallax bgImage='/image/ads1.jpg' className='w-full' strength={500}>
					<div className='flex flex-col justify-center items-center my-10 lg:my-40'>
						<div
							className='p-2 rounded-sm'
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.9)",
							}}
						>
							<div className='border border-gray-300 p-8 lg:p-12 xl:p-16 2xl:p-24 rounded-sm'>
								<div className='flex flex-col justify-center items-center'>
									<div className='font-medium text-3xl text-black'>
										CONTACT<span className='text-red-500'>{" US"}</span>
									</div>
									<hr
										className='w-4/5 my-px bg-red-500'
										style={{ height: "2px" }}
									/>
									<hr
										className='w-3/5 my-px bg-red-500'
										style={{ height: "1.8px" }}
									/>
									<hr
										className='w-2/5 my-px bg-red-500'
										style={{ height: "1.5px" }}
									/>
								</div>
							</div>
						</div>
					</div>
				</Parallax>
				<div className='flex justify-center my-4 lg:mt-12'>
					<div className='lg:min-w-[60vw] md:grid grid-cols-2 gap-10'>
						<div>
							<form>
								<div>
									<div className='font-medium text-lg lg:text-2xl'>
										SEND US A<span className='text-red-500'>{" MESSAGE"}</span>
									</div>
									<div className='max-w-sm'>
										<hr
											className='w-3/12 my-px bg-red-500'
											style={{ height: "2px" }}
										/>
										<hr
											className='w-2/12 my-px bg-red-500'
											style={{ height: "1.8px" }}
										/>
										<hr
											className='w-1/12 my-px bg-red-500'
											style={{ height: "1.5px" }}
										/>
									</div>
								</div>
								<div className='my-6 lg:my-12 space-y-2'>
									<div>
										<TextField
											label='Name'
											size='small'
											className='w-full'
											onChange={e => setForm({ ...form, name: e.target.value })}
										/>
									</div>
									<div>
										<TextField
											label='Phone'
											size='small'
											type='number'
											className='w-full'
											onChange={e => setForm({ ...form, phone: e.target.value })}
										/>
									</div>
									<div>
										<TextField
											label='Email'
											size='small'
											className='w-full'
											error={emailValidator(form.email) !== undefined}
											onChange={e => setForm({ ...form, email: e.target.value })}
										/>
									</div>
									<div>
										<TextField
											label='Subject'
											size='small'
											className='w-full'
											onChange={e => setForm({ ...form, subject: e.target.value })}
										/>
									</div>
									<div>
										<textarea
											className='border border-gray-300 w-full p-2 h-24 bg-transparent'
											placeholder='Message'
											onChange={e => setForm({ ...form, message: e.target.value })}
										/>
									</div>
									<div>
										{message}
									</div>
									<div className='flex justify-end'>
										<Button
											variant='outlined'
											size='small'
											disabled={loading}
											startIcon={loading && <CircularProgress size={14} />}
											onClick={send}
										>
											SEND
										</Button>
									</div>
								</div>
							</form>
						</div>

						<div>
							<div>
								<div className='font-medium text-lg lg:text-2xl'>
									GET IN<span className='text-red-500'>{" TOUCH"}</span>
								</div>
								<div className='max-w-sm'>
									<hr
										className='w-3/12 my-px bg-red-500'
										style={{ height: "2px" }}
									/>
									<hr
										className='w-2/12 my-px bg-red-500'
										style={{ height: "1.8px" }}
									/>
									<hr
										className='w-1/12 my-px bg-red-500'
										style={{ height: "1.5px" }}
									/>
								</div>
							</div>
							<div className='my-6 lg:my-12 space-y-2'>
								<div className='flex space-x-2'>
									<Phone />
									<div>{OjarhPhone}</div>
								</div>
								<div className='flex space-x-2'>
									<Mail />
									<div>{OjarhEmail}</div>
								</div>
								<div className='flex space-x-2'>
									<Place />
									<div>{OjarhAddress}</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:max-w-[60vw] mb-4 mx-auto w-[90%] md:w-[80%] rounded-lg overflow-hidden">
					<div className='mapouter w-full h-full'>
						<div className='gmap_canvas w-full h-full'>
							<iframe
								loading="lazy"
								height="400"
								allowFullScreen
								className="w-full"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.99887681187!2d6.797773630600111!3d6.130851615118213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104393a2a8008039%3A0xee2fa5e07a4402!2s22%20Oraifite%20Rd%2C%20Army%20Barracks%20434243%2C%20Onitsha%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1664833375528!5m2!1sen!2sus"
								referrerPolicy="no-referrer-when-downgrade">

							</iframe>
						</div>
					</div>
				</div>
			</Paper>
		</Layout>
	);
};
export default Page;
