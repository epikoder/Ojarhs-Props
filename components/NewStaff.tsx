import React, { useEffect, useRef, useState } from "react";

function NewStaff({ setOpen, type }) {
	return (
		<div className='  z-40 absolute w-full new  mx-auto pb-12 overflow-scroll h-[90vh] scrollbar-hide p-4'>
			{/* <div className='rounded-md bg-gray-300 lg:w-7/12 w-11/12 mx-auto overflow-hidden md:w-9/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 pt-4 relative'>
				<XIcon
					className='w-6 h-6 absolute top-2 right-2 hov text-gray-600 '
					onClick={() => setOpen(false)}
				/>
				<h1 className='red text-center text-3xl mt-4'>
					{" "}
					{type === "new" ? <p>Add New Staff</p> : <p>Update Staff</p>}
				</h1>
				<form action='' className='space-y-4 py-8 px-1 md:px-2 lg:px-4'>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>
								Name
							</span>
							<input
								// ref={lnRef}
								type='text'
								placeholder='Name'
								value={Name}
								{...register("Name")}
								onChange={(e) => setName(e.target.value)}
								className={`${errors.Name
									? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
									: "text-gray-400 bg-transparent outline-none"
									}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.Name?.message as string}</div>
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
								value={email}
								{...register("email")}
								onChange={(e) => setEmail(e.target.value)}
								className={`${errors.email
									? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
									: "text-gray-400 bg-transparent outline-none"
									}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.email?.message as string}</div>
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
								value={phone}
								{...register("phoneNo")}
								onChange={(e) => setPhone(e.target.value)}
								className={`${errors.phoneNo
									? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
									: "text-gray-400 bg-transparent outline-none"
									}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.phoneNo?.message as string}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>`fee`</span>
							<input
								// ref={phoneRef}
								type='text'
								placeholder='`fee`'
								value={fee}
								{...register("fee")}
								onChange={(e) => setFee(e.target.value)}
								className={`${errors.phoneNo
									? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
									: "text-gray-400 bg-transparent outline-none"
									}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.fee?.message as string}</div>
					</div>


					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Description</span>
							<textarea
								// ref={shopNoRef}								
								placeholder='Write a brief Description of what you do...'
								value={description}
								{...register("description")}
								onChange={(e) => setDescription(e.target.value)}
								className={`${errors.shopNo
									? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
									: "text-gray-400 bg-transparent outline-none"
									}`}
							></textarea>
						</label>
						<div className='red text-xs ml-4'>{errors.description?.message as string}</div>
					</div>

					{type === "new" ? (
						<button
							type='submit'
							className='w-full outline-none'
							onClick={handleSubmit}
						>
							<div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer'>
								Add New
							</div>
						</button>
					) : (
						<button className='w-full outline-none' onClick={handleUpdate}>
							<div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer'>
								Update
							</div>
						</button>
					)}
				</form>
			</div> */}
		</div>
	);
}

export default NewStaff;
