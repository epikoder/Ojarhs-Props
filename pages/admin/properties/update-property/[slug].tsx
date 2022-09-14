import React from "react";
import { ApiResponse, Space } from "../../../../Typing.d";
import { ImageUpload, VideoUpload } from "../../../../components/ImageUpload";
import { GalleryUploader } from "../../../../components/admin/GalleryUploader";
import { PaymentPlans, PropertyType } from "../../../../components/Resource";
import { useAppDispatch } from "../../../../store";
import Loader from "../../../../components/Loader";
import { addNewPropertyThunck } from "../../../../redux/admin/admin";
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout";
import { useRouter } from "next/router";
import { Api } from "../../../../helpers/api";
import { fixSpace, resolveFilePath } from "../../../../helpers/helpers";
import { TrashIcon } from "@heroicons/react/outline";
import { AxiosError } from "axios";
import { ArrowLeftIcon } from "@heroicons/react/solid";

function UpdateProp() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [errMessage, setErrMessage] = React.useState<{ status?: boolean, text: string }>({} as { status?: boolean, text: string })
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
        plan: '',
        galleries: [],
        video_galleries: []
    } as Space)
    const [formError, setFormError] = React.useState<Space>({} as Space)
    const [gallery, setGallery] = React.useState({ photo: '', video: '', photos: [] as string[], videos: [] as string[] })

    const _req = async () => {
        setLoading(true)
        try {
            const { data, status } = await Api().get<ApiResponse<Space>>(`/admin/properties/view?slug=${router.asPath.split('/').pop()}`)
            setLoading(false)
            if (status === 200 && data.status === 'success') {
                const s = fixSpace(data.data)
                setForm({
                    ...s, galleries: [], video_galleries: [], photo: '', video: ''
                })
                return setGallery({
                    photo: s.photo,
                    video: s.video,
                    photos: s.galleries,
                    videos: s.video_galleries
                })
            }

            setErrMessage({
                text: 'Failed to fetch property'
            })
        } catch (error) {
            setLoading(false)
            setErrMessage({
                text: 'Failed to fetch property'
            })
        }
    }

    React.useEffect(() => {
        if (router.isReady === true && !loading) {
            _req()
        }
    }, [router.isReady])

    const deleteGalleryImage = async (s: string, i: number) => {
        const { status, data } = await Api().delete<ApiResponse>(`/admin/properties/delete/gallery?slug=${form.slug}&photo=${s}`)
        if (status === 200) {
            if (data.status === 'failed') {
                return
            }
            setGallery({
                ...gallery, photos: gallery.photos.slice(0, i).concat(gallery.photos.slice(i + 1, gallery.photos.length))
            })
        }
    }

    const deleteGalleryVideo = async (s: string, i: number) => {
        const { status, data } = await Api().delete<ApiResponse>(`/admin/properties/delete/gallery?slug=${form.slug}&video=${s}`)
        if (status === 200) {
            if (data.status === 'failed') {
                return
            }
            setGallery({
                ...gallery, videos: gallery.videos.slice(0, i).concat(gallery.videos.slice(i + 1, gallery.videos.length))
            })
        }
    }

    const update = async () => {
        try {
            setLoading(true)
            const { data, status } = await Api().put<ApiResponse>("/admin/properties/update", JSON.stringify({ ...form, amount: parseInt(form.amount.toString()) }))
            setLoading(false)
            if (status !== 200) return
            setErrMessage({
                status: data.status === 'success',
                text: data.message
            })
            if (data.status === 'success') {
                setTimeout(async () => {
                    await router.replace('/admin/properties')
                }, 800)
            }
        } catch (error) {
            setLoading(false)
            const { data, status } = (error as AxiosError).response
            switch (status) {
                case 500:
                    setErrMessage({
                        text: 'Error Occurred'
                    })
                    break
                case 400:
                    const _data = (data as ApiResponse)
                    setFormError(_data.error !== undefined && _data.error as unknown as Space)
                    setErrMessage({
                        text: _data.message
                    })
            }
        }
    }

    return (
        <AdminDashboardLayout>
            {() =>
                <React.Fragment>
                    <div>
                        <ArrowLeftIcon className="cursor-pointer text-red-500" onClick={() => router.back()} width={40} height={30} />
                    </div>
                    <div className='rounded-md bg-white border my-4 mb-8 shadow-md relative'>
                        <h1 className='red text-center p-4'>
                            <div className="uppercase text-sm">Update Property</div>
                        </h1>
                        <h1 className={`text-center my-1 text-${!errMessage.status ? 'red' : 'blue'}-500`}>
                            <div className="font-serif text-sm">{errMessage.text !== undefined && errMessage.text}</div>
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
                                    value={form.type}
                                    error={formError.type !== undefined}
                                    handleChange={(s) => setForm({
                                        ...form, type: s
                                    })} />
                            </label>

                            <label
                                htmlFor=''
                                className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
                            >
                                <span className='text-gray-500 mb-2 text-xs idden'>Payment Plan</span>
                                <PaymentPlans
                                    value={form.plan}
                                    error={formError.plan !== undefined}
                                    handleChange={(s) => setForm({
                                        ...form, plan: s
                                    })} />
                            </label>
                            <label htmlFor="Featured Image" className="my-2">
                                <span className='text-gray-500 mb-2 text-sm idden'>Featured Image</span>
                                <ImageUpload
                                    value={resolveFilePath(gallery.photo)}
                                    message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED IMAGE"}</div>}
                                    width={260}
                                    handleUpload={(s, raw) => setForm({
                                        ...form, photo: s
                                    })} />
                            </label>
                            {(gallery.photos.length !== 0) && <div className="flex overflow-x-scroll">
                                {form !== undefined && gallery.photos?.map((s: string, i: number) =>
                                    <div className="mx-1 relative" key={i}>
                                        <div className="absolute z-10 right-0 cursor-pointer" onClick={() => deleteGalleryImage(s, i)}>
                                            <TrashIcon className="text-black bg-white rounded-full p-1 hover:bg-red-500 hover:text-white" height={25} />
                                        </div>
                                        <ImageUpload
                                            disabled={true}
                                            value={resolveFilePath(s)}
                                            message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED IMAGE"}</div>}
                                            width={260} />
                                    </div>)}
                            </div>}

                            <label
                                htmlFor=''
                                className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
                            >
                                <GalleryUploader
                                    title="Upload Gallery Videos"
                                    type="image"
                                    width={260}
                                    pre={gallery.photos.length}
                                    handleChange={(l) => setForm({
                                        ...form, galleries: l
                                    })} />
                            </label>

                            <label htmlFor="Featured Video" className="my-2">
                                <span className='text-gray-500 mb-2 text-sm idden'>Featured Video</span>
                                <VideoUpload
                                    src={resolveFilePath(gallery.video)}
                                    headless={false}
                                    message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED VIDEO"}</div>}
                                    width={260} handleUpload={(s) => setForm({
                                        ...form, video: s
                                    })} />
                            </label>

                            {(gallery.videos.length !== 0) && <div className="flex overflow-x-scroll">
                                {form !== undefined && gallery.videos?.map((s: string, i: number) =>
                                    <div className="mx-1 relative" key={i}>
                                        <div className="absolute z-10 right-0 cursor-pointer" onClick={() => deleteGalleryVideo(s, i)}>
                                            <TrashIcon className="text-black bg-white rounded-full p-1 hover:bg-red-500 hover:text-white" height={25} />
                                        </div>
                                        <VideoUpload
                                            disabled={true}
                                            headless={false}
                                            src={resolveFilePath(s)}
                                            width={260} />
                                    </div>)}
                            </div>}
                            <label
                                htmlFor=''
                                className='flex flex-col bg-gray-100 shadow-sm shadow-gray-400 rounded-lg p-2'
                            >
                                <GalleryUploader
                                    title="Upload Gallery Videos"
                                    type="video"
                                    width={260}
                                    pre={gallery.videos.length}
                                    handleChange={(l) => setForm({
                                        ...form, video_galleries: l
                                    })} />
                            </label>
                            {loading && <Loader />}
                            <button
                                type='submit'
                                className='w-full outline-none'
                                onClick={() => update()}
                            >
                                <div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer '>
                                    {status !== 'pending' ? 'Update Property' : 'Please wait...'}
                                </div>
                            </button>
                        </form>
                    </div>
                </React.Fragment>}
        </AdminDashboardLayout>
    );
}

export default UpdateProp;
