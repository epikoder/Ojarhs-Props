import React from "react";
import { ApiResponse, Space } from "../../../../Typing.d";
import { ImageUpload, VideoUpload } from "../../../../components/ImageUpload";
import { GalleryUploader } from "../../../../components/admin/GalleryUploader";
import { PaymentPlans, PropertyType } from "../../../../components/Resource";
import Loader from "../../../../components/Loader";
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout";
import { useRouter } from "next/router";
import { Api } from "../../../../helpers/api";
import { fixSpace, resolveFilePath } from "../../../../helpers/helpers";
import { AxiosError } from "axios";
import { FormInput } from "../../../../components/FormInput";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";

function UpdateProp() {
    const [loading, setLoading] = React.useState<boolean>(false)
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
                        <IconButton onClick={() => router.back()}>
                            <ArrowBack />
                        </IconButton>
                    </div>
                    <Card className='rounded-md relative'>
                        <h1 className='red text-center p-2'>
                            <div className="uppercase text-sm">Update Property</div>
                        </h1>
                        <h1 className={`text-center my-1 text-${!errMessage.status ? 'red' : 'blue'}-500`}>
                            <div className="font-serif text-sm">{errMessage.text !== undefined && errMessage.text}</div>
                        </h1>
                        <form onSubmit={e => e.preventDefault()} action='' className='space-y-4 py-8 px-4 md:px-2 lg:px-4'>
                            <FormInput
                                props={{
                                    value: form.name,
                                    handleChange: (s) => setForm({
                                        ...form, name: s
                                    }),
                                    title: 'Name',
                                    message: formError.name,
                                    required: true,
                                }}
                            />

                            <FormInput
                                props={{
                                    value: form.no,
                                    handleChange: (s) => setForm({
                                        ...form, no: s
                                    }),
                                    title: 'Property ID',
                                    message: formError.no,
                                    required: true,
                                }}
                            />

                            <FormInput
                                props={{
                                    value: form.description,
                                    handleChange: (s) => setForm({
                                        ...form, size: s
                                    }),
                                    title: 'Size',
                                    message: formError.size,
                                    required: true,
                                }}
                            />

                            <FormInput
                                props={{
                                    value: form.description,
                                    handleChange: (s) => setForm({
                                        ...form, description: s
                                    }),
                                    title: 'Description',
                                    message: formError.description,
                                    required: true,
                                }}
                            />

                            <FormInput
                                props={{
                                    value: form.address,
                                    handleChange: (s) => setForm({
                                        ...form, address: s
                                    }),
                                    title: 'Address',
                                    message: formError.address,
                                    required: true,
                                }}
                            />

                            <FormInput
                                props={{
                                    value: form.amount,
                                    handleChange: (s) => setForm({
                                        ...form, amount: s
                                    }),
                                    title: 'Amount',
                                    message: formError.amount !== undefined ? formError.amount.toString() : undefined,
                                    required: true,
                                    type: 'number'
                                }}
                            />

                            <PropertyType
                                value={form.type}
                                error={formError.type !== undefined}
                                handleChange={(s) => setForm({
                                    ...form, type: s
                                })} />

                            <PaymentPlans
                                value={form.plan}
                                error={formError.plan !== undefined}
                                handleChange={(s) => setForm({
                                    ...form, plan: s
                                })} />
                            <div>
                                <div className='mb-2 text-sm idden'>Featured Image</div>
                                <ImageUpload
                                    value={gallery.photo}
                                    message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED IMAGE"}</div>}
                                    width={260}
                                    handleUpload={(s) => setForm({
                                        ...form, photo: s
                                    })} />
                            </div>
                            {(gallery.photos.length !== 0) && <div className="flex overflow-x-scroll">
                                {form !== undefined && gallery.photos?.map((s: string, i: number) =>
                                    <div className="mx-1 relative" key={i}>
                                        <IconButton className="absolute z-10 right-0 cursor-pointer" onClick={() => deleteGalleryImage(s, i)}>
                                            <Delete height={25} />
                                        </IconButton>
                                        <ImageUpload
                                            disabled={true}
                                            value={resolveFilePath(s)}
                                            message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED IMAGE"}</div>}
                                            width={260} />
                                    </div>)}
                            </div>}

                            <div className="my-2">
                                <GalleryUploader
                                    title="Upload Gallery Images"
                                    type="image"
                                    width={260}
                                    pre={gallery.photos.length}
                                    handleChange={(l) => setForm({
                                        ...form, galleries: l
                                    })} />
                            </div>

                            <div>
                                <VideoUpload
                                    src={resolveFilePath(gallery.video)}
                                    headless={false}
                                    message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED VIDEO"}</div>}
                                    width={260} handleUpload={(s) => setForm({
                                        ...form, video: s
                                    })} />
                            </div>

                            {(gallery.videos.length !== 0) && <div className="flex overflow-x-scroll">
                                {form !== undefined && gallery.videos?.map((s: string, i: number) =>
                                    <div className="mx-1 relative" key={i}>
                                        <IconButton className="absolute z-10 right-0 cursor-pointer" onClick={() => deleteGalleryVideo(s, i)}>
                                            <Delete height={25} />
                                        </IconButton>
                                        <VideoUpload
                                            disabled={true}
                                            headless={false}
                                            src={resolveFilePath(s)}
                                            width={260} />
                                    </div>)
                                }
                            </div>}
                            <div className="my-2">
                                <GalleryUploader
                                    title="Upload Gallery Videos"
                                    type="video"
                                    width={260}
                                    pre={gallery.videos.length}
                                    handleChange={(l) => setForm({
                                        ...form, video_galleries: l
                                    })} />
                            </div>
                            {loading && <Loader />}
                            <div className="flex justify-center">
                                <Button
                                    variant="outlined"
                                    size='small'
                                    startIcon={loading && <CircularProgress size={14} />}
                                    onClick={update}
                                >
                                    Update property
                                </Button>
                            </div>
                        </form>
                    </Card>
                </React.Fragment>}
        </AdminDashboardLayout>
    );
}

export default UpdateProp;
