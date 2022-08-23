import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import {
	addProperty,
	getIndividualProperty,
	updatePropert,
	updateProperty,
} from "../features/PropertySlice";
import uniqid from "uniqid";

function NewProps({ setOpen, type }) {
	const dispatch = useDispatch();
	const individualProp = useSelector(getIndividualProperty);
	const [status, setStatus] = useState("shop");
	const [Name, setName] = useState("");
	const [No, setShopNo] = useState("");
	// const [description, setDescription] = useState("");
	const [Size, setShopSize] = useState("");
	const [Price, setPrice] = useState("");

	console.log(individualProp);

	useEffect(() => {
		if (type === "update") {
			setName(individualProp.name);
			setShopNo(individualProp.no);
			setShopSize(individualProp.size);
			setPrice(individualProp.amount);
			setStatus(individualProp.type	);
		}
	}, [type]);

	const validationSchema = Yup.object().shape({
		shopNo: Yup.string().required("ShopNo is required"),
		Name: Yup.string().required("Name is required"),
		description: Yup.string().required("Description is required"),
		shopSize: Yup.string().required("Shop Size is required"),
		price: Yup.string().required("Price is required"),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// get functions to build form with useForm() hook
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;


	if (type === "update") {
		console.log(Name);
	}

	function handuSubmit(e) {
		if (type === "new") {
			e.preventDefault();
			dispatch(
				addProperty({
					id: uniqid(),
					name: Name,
					size: Size,
					no: No,
					type: status,
					amount: Price,
					// Description: Description,
				}),
			);

			setOpen(false);
		}
	}

	const handleUpdate = (e) => {		
		e.preventDefault();
		setOpen(false);
		dispatch(
			updateProperty({
				...individualProp,
				name: Name,
				size: Size,
				no: No,
				type: status,
				amount: Price,
				// Description: Description,
			}),
		);
		setOpen(false);
	};

	return (
		<div className='bg-gray-0  z-40 absolute w-full new  mx-auto pb-12 overflow-scroll h-[90vh] scrollbar-hide p-4'>
			<div className='rounded-md bg-gray-300 lg:w-7/12 w-11/12 mx-auto overflow-hidden md:w-9/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 pt-4 relative'>
				<XIcon
					className='w-6 h-6 absolute top-2 right-2 hov text-gray-600 '
					onClick={() => setOpen(false)}
				/>
				<h1 className='red text-center text-3xl mt-4'>
					{" "}
					{type === "new" ? <p>Add New Propert</p> : <p>Update Property</p>}
				</h1>
				<form action='' className='space-y-4 py-8 px-1 md:px-2 lg:px-4'>
					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Name</span>
							<input
								type='text'
								placeholder='Name'
								value={Name}
								{...register("Name")}
								onChange={(e) => setName(e.target.value)}
								className={`${
									errors.Name
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.Name?.message}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>PropNo</span>
							<input
								type='text'
								placeholder='Prop No'
								value={No}
								{...register("shopNo")}
								onChange={(e) => setShopNo(e.target.value)}
								className={`${
									errors.shopNo
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.shopNo?.message}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>PropSize</span>
							<input
								type='text'
								placeholder='PropSize'
								value={Size}
								{...register("shopSize")}
								onChange={(e) => setShopSize(e.target.value)}
								className={`${
									errors.shopSize
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.shopSize?.message}</div>
					</div>

					<div>
						<label
							htmlFor=''
							className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-600 mb-2 text-xs idden'>Price</span>
							<input
								type='number'
								placeholder='Price'
								value={Price}
								{...register("Price")}
								onChange={(e) => setPrice(e.target.value)}
								className={`${
									errors.Price
										? "text-gray-400 bg-transparent border-red-500 border outline-red-500"
										: "text-gray-400 bg-transparent outline-none"
								}`}
							/>
						</label>
						<div className='red text-xs ml-4'>{errors.Price?.message}</div>
					</div>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Type</span>
						<select
							name=''
							id=''
							className='bg-transparent outline-none text-gray-400'
							required
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value='shop'>Shop</option>
							<option value='office'>Office</option>
							<option value='warehouse'>Warehouse</option>
						</select>
					</label>

					{type === "new" ? (
						<button
							type='submit'
							className='w-full outline-none'
							onClick={handuSubmit}
						>
							<div className='bg-red-100 mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer'>
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

export default NewProps;
