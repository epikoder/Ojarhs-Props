import React from "react";
import { useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import { Space } from "../Typing.d";
import { ImageUpload, VideoUpload } from "./ImageUpload";
import { GalleryUploader } from "./admin/GalleryUploader";
import { PaymentPlans, PropertyType } from "./Resource";
import { RootState, useAppDispatch } from "../store";
import Loader from "./Loader";
import { addNewPropertyThunck } from "../redux/admin/property";

function NewProps({ setOpen, type }: {
	setOpen: React.Dispatch<React.SetStateAction<{
		type?: 'new' | 'update';
		state?: boolean;
	}>>, type: 'new' | 'update'
}) {
	const dispatch = useAppDispatch();
	const [form, setForm] = React.useState<Space>({
		name: '',
		amount: 0,
		description: '',
		no: '',
		photo: '',
		type: '',
		address: '',
		size: '',
		video: '',
		plan_name: '',
		galleries: [],
		video_galleries: []
	} as Space)
	const [formError, setFormError] = React.useState<Space>({} as Space)
	const { status, err } = useSelector((store: RootState) => store.propertySlice)

	React.useEffect(() => {
		setFormError(err)
	}, [err])
	const submit = () => {
		dispatch(addNewPropertyThunck(form))
	}

	return (
		<div className="relative w-full">
			<div className='z-10 inset-0 absolute h-[90vh] overflow-scroll scrollbar-hide bg-slate-100 py-4 lg:py-8 my-2'>
				<div className='rounded-md bg-white border lg:w-10/12 w-11/12 mx-auto md:my-12 overflow-hidden md:w-10/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md space-y-2 pt-4 relative'>
					<XIcon
						className='w-6 h-6 absolute top-2 right-2 hov text-gray-600 '
						onClick={() => setOpen({ state: false })}
					/>
					<h1 className='red text-center mt-4'>
						{type === "new" ? <div className="uppercase text-sm">Add New Property</div> : <div className="uppercase text-sm">Update Property</div>}
					</h1>
					<form onSubmit={e => e.preventDefault()} action='' className='space-y-4 py-8 px-4 md:px-2 lg:px-4'>
						<div>
							<label
								htmlFor=''
								className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
							>
								<span className='text-gray-500 mb-2 text-xs idden'>Name</span>
								<input
									type='text'
									placeholder='Name'
									value={form.name}
									className={`outline-none bg-transparent text-gray-600 ${formError.name && 'outline-red-500'}`}
									onChange={(e) => setForm({
										...form, name: e.target.value
									})}
								/>
							</label>
							<div className='red text-xs ml-4'>{formError.name}</div>
						</div>

						<div>
							<label
								htmlFor=''
								className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
							>
								<span className='text-gray-500 mb-2 text-xs idden'>Property ID</span>
								<input
									type='text'
									placeholder='XXXXX/XXX/XXX'
									value={form.no}
									className={`outline-none bg-transparent text-gray-600 ${formError.no && 'outline-red-500'}`}
									onChange={(e) => setForm({
										...form, no: e.target.value
									})}
								/>
							</label>
							<div className='red text-xs ml-4'>{formError.no as string}</div>
						</div>

						<div>
							<label
								htmlFor=''
								className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
							>
								<span className='text-gray-500 mb-2 text-xs idden'>Size</span>
								<input
									type='text'
									placeholder='Size'
									value={form.size}
									className={`outline-none bg-transparent text-gray-600 ${formError.size && 'outline-red-500'}`}
									onChange={(e) => setForm({
										...form, size: e.target.value
									})}
								/>
							</label>
							<div className='red text-xs ml-4'>{formError.size}</div>
						</div>

						<div>
							<label
								htmlFor=''
								className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
							>
								<span className='text-gray-500 mb-2 text-xs idden'>Description</span>
								<input
									type='text'
									placeholder='Description'
									value={form.description}
									className={`outline-none bg-transparent text-gray-600 ${formError.description && 'outline-red-500'}`}
									onChange={(e) => setForm({
										...form, description: e.target.value
									})}
								/>
							</label>
							<div className='red text-xs ml-4'>{formError.description}</div>
						</div>

						<div>
							<label
								htmlFor=''
								className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
							>
								<span className='text-gray-500 mb-2 text-xs idden'>Address</span>
								<input
									type='text'
									placeholder='Address'
									value={form.address}
									className={`outline-none bg-transparent text-gray-600 ${formError.address && 'outline-red-500'}`}
									onChange={(e) => setForm({
										...form, address: e.target.value
									})}
								/>
							</label>
							<div className='red text-xs ml-4'>{formError.address}</div>
						</div>

						<div>
							<label
								htmlFor=''
								className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
							>
								<span className='text-gray-500 mb-2 text-xs idden'>Price in *Naira</span>
								<input
									type='number'
									placeholder='Amount'
									value={form.amount}
									className={`outline-none bg-transparent text-gray-600 ${formError.amount && 'outline-red-500'}`}
									onChange={(e) => setForm({
										...form, amount: e.target.value as unknown as number
									})}
								/>
							</label>
							<div className='red text-xs ml-4'>{formError.amount}</div>
						</div>

						<label
							htmlFor=''
							className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-500 mb-2 text-xs idden'>Property Type</span>
							<PropertyType
								handleChange={(s) => setForm({
									...form, type: s
								})} />
						</label>

						<label
							htmlFor=''
							className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<span className='text-gray-500 mb-2 text-xs idden'>Payment Plan</span>
							<PaymentPlans handleChange={(s) => setForm({
								...form, plan_name: s
							})} />
						</label>
						<ImageUpload
							message={<div className="text-sm text-gray-500">{"FEATURED IMAGE"}</div>}
							width={260}
							handleUpload={(s, raw) => setForm({
								...form, photo: s
							})} />
						<label
							htmlFor=''
							className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<GalleryUploader
								title="Upload Gallery Videos"
								type="image"
								width={260}
								handleChange={(l) => setForm({
									...form, galleries: l
								})} />
						</label>

						<VideoUpload
							message={<div className="text-sm text-gray-500">{"FEATURED VIDEO"}</div>}
							width={260} handleUpload={(s) => setForm({
								...form, video: s
							})} />
						<label
							htmlFor=''
							className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
						>
							<GalleryUploader
								title="Upload Gallery Videos"
								type="video"
								width={260}
								handleChange={(l) => setForm({
									...form, video_galleries: l
								})} />
						</label>
						{status === 'pending' && <Loader />}
						{(type === "new" ? (
							<button
								type='submit'
								className='w-full outline-none'
								onClick={submit}
							>
								<div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer '>
									{status !== 'pending' ? 'Add New' : 'Please wait...'}
								</div>
							</button>
						) : (
							<button className='w-full outline-none' onClick={() => { }}>
								<div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer'>
									{status !== 'pending' ? 'Update' : 'Please wait...'}
								</div>
							</button>
						))}

					</form>
				</div>
			</div>
		</div>
	);
}

export default NewProps;
