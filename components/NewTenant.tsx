import React from "react";

function NewTenant() {
	return (
		<div className=' z-40 absolute w-full bg mx-auto pb-12 overflow-scroll h-full scrollbar-hide p-4'>
			<div className='rounded-md bg-gray-300 lg:w-7/12 w-11/12 mx-auto overflow-hidden md:w-9/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 pt-4 relative'>
				<h1 className='red text-center text-3xl mt-4'>
					<p>Add New Tenant</p>
				</h1>
				<form action='' className='space-y-4 py-8 px-1 md:px-2 lg:px-4'>
					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>
								First Name
							</span>
							<input
								type='text'
								placeholder='First Name'
							/>
						</label>
						{/* <div className='red text-xs ml-4'>{errors.firstName?.message as string}</div> */}
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>
								Last Name
							</span>
							<input
								// ref={lnRef}
								type='text'
								placeholder='Last Name'
							/>
						</label>
						{/* <div className='red text-xs ml-4'>{errors.lastName?.message as string}</div> */}
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Address</span>
							<input
								// ref={addressRef}
								type='text'
								placeholder='Adress'
							/>
						</label>
						{/* <div className='red text-xs ml-4'>{errors.address?.message as string}</div> */}
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Email</span>
							<input
								// ref={emailRef}
								type='email'
								placeholder='Email'
							/>
						</label>
						{/* <div className='red text-xs ml-4'>{errors.email?.message as string}</div> */}
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Phone No</span>
							<input
								// ref={phoneRef}
								type='text'
								placeholder='Phone No'
							/>
						</label>
						{/* <div className='red text-xs ml-4'>{errors.phoneNo?.message as string}</div> */}
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Shop No</span>
							<input
								// ref={shopNoRef}
								type='text'
								placeholder='Shop No'
							/>
						</label>
						{/* <div className='red text-xs ml-4'>{errors.shopNo?.message as string}</div> */}
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>
								Registeration code
							</span>
							<input
								type='number'
								placeholder='Registeration code'
							/>
						</label>
						<div className='red text-xs ml-4'>
							{/* {errors.registerationCode?.message as string} */}
						</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col relative bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs flex justify-between'>
								password{" "}
							</span>
							<input
								placeholder='password'
							/>

							{/* {togglePasswordState ? (
								<EyeOffIcon
									onClick={() => dispatch(ShowPassword())}
									className='w-4 h-4 absolute bottom-3 right-3'
								/>
							) : (
								<EyeIcon
									onClick={() => dispatch(HidePassword())}
									className='w-4 h-4 absolute bottom-3 right-2'
								/>
							)} */}
						</label>
						{/* <div className='red text-xs ml-4'>{errors.password?.message as string}</div> */}
					</div>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Status</span>
						<select
							name=''
							id=''
							className='bg-transparent outline-none text-gray-400'
							required
						// value={status}
						// onChange={(e) => setStatus(e.target.value)}
						>
							<option value='active'>Active</option>
							<option value='banned'>Banned</option>
						</select>
					</label>

					<div className='flex items-center'>
						<span className='text-sm px-4 text-gray-600'>
							Pay for application
						</span>
						<input type='checkbox' />
					</div>

					<button
						type='submit'
						className='w-full outline-none'
					>
						<div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer'>
							Add New
						</div>
					</button>
				</form>
			</div>
		</div>
	);
}

export default NewTenant;
