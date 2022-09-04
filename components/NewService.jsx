import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import { ShowPassword, HidePassword } from "../features/TogglePassword";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import {
	addService,
	getIndividualService,
	updateService,
} from "../features/ServiceSlice";
import uniqid from "uniqid";
import { Api } from "../helpers/api";

function NewService({ setOpen, type }) {
	const dispatch = useDispatch();
	const individualService = useSelector(getIndividualService);
	const [name, setname] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [plan, setplan] = useState("");
	const [manager, setManager] = useState("");

	useEffect(() => {
		if (type === "update") {
			setname(individualService.name);
			setAmount(individualService.amount);
			setplan(individualService.plan);
			setDescription(individualService.description);
			setManager(individualService.manager);
		}
	}, [type, individualService]);

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Service name is Required"),
		amount: Yup.string().required("Service Amount is Required"),
		plan: Yup.string().required("Service plan is required"),
		manager: Yup.string().required("Service manager is required"),
		description: Yup.string().required("Service Description is required"),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// get functions to build form with useForm() hook
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	function onSubmit(data) {
		if (type === "new") {			
			dispatch(
				addService({
					// id: uniqid(),
					name: data.name,
					amount: parseInt(data.amount),
					plan: data.plan,
					manager: data.manager,
					description: data.description,
				}),
			);

			setOpen(false);
		}
	}

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(
			updateService({
				...individualService,
				name: name,
				amount: amount,
				plan: plan,
				description: description,
				manager: manager,
			}),
		);
		setOpen(false);
	};

	return (
		<div className='bg  z-40 absolute w-full mx-auto pb-12 overflow-scroll h-[90vh] scrollbar-hide p-4'>
			<div className='rounded-md bg-gray-300 lg:w-7/12 w-11/12 mx-auto overflow-hidden md:w-9/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 pt-4 relative'>
				<XIcon
					className='w-6 h-6 absolute top-2 right-2 hov text-gray-600 '
					onClick={() => setOpen(false)}
				/>
				<h1 className='red text-center text-3xl mt-4'>
					{" "}
					{type === "new" ? <p>Add New Service</p> : <p>Update Service</p>}
				</h1>
				<form action='' className='space-y-4 py-8 px-1 md:px-2 lg:px-4'>
					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2 mb-4'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>manager</span>
							<input
								// ref={fnRef}
								type='text'
								placeholder='manager'
								value={manager}
								{...register("manager", { required: true })}
								onChange={(e) => setManager(e.target.value)}
								className={`${
									errors.manager
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>

						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>name</span>
							<input
								// ref={fnRef}
								type='text'
								placeholder='name'
								value={name}
								{...register("name", { required: true })}
								onChange={(e) => setname(e.target.value)}
								className={`${
									errors.name
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.name?.message}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Plan</span>
							<input
								// ref={fnRef}
								type='text'
								placeholder='plan'
								value={plan}
								{...register("plan", { required: true })}
								onChange={(e) => setplan(e.target.value)}
								className={`${
									errors.plan
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.plan?.message}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Amount</span>
							<input
								// ref={fnRef}
								type='number'
								placeholder='amount'
								value={amount}
								{...register("amount", { required: true })}
								onChange={(e) => setAmount(e.target.value)}
								className={`${
									errors.amount
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.amount?.message}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>
								Description
							</span>
							<textarea
								// ref={fnRef}
								placeholder='description'
								value={description}
								{...register("description", { required: true })}
								onChange={(e) => setDescription(e.target.value)}
								className={`${
									errors.description
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							></textarea>
						</label>
						<div className='red text-xs ml-4'>
							{errors.description?.message}
						</div>
					</div>

					{type === "new" ? (
						<button
							type='submit'
							className='w-full outline-none'
							onClick={handleSubmit(onSubmit)}
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
			</div>
		</div>
	);
}

export default NewService;
