import React from "react";
import { useSelector } from "react-redux";
import { ApiResponse, Service, Space } from "../../../../Typing.d";
import { ImageUpload, VideoUpload } from "../../../../components/ImageUpload";
import { GalleryUploader } from "../../../../components/admin/GalleryUploader";
import { PaymentPlans, PropertyType } from "../../../../components/Resource";
import { RootState, useAppDispatch } from "../../../../store";
import Loader from "../../../../components/Loader";
import { addNewPropertyThunck, addNewServiceThunck } from "../../../../redux/admin/admin";
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout";
import { useRouter } from "next/router";
import { resetPropertyState } from "../../../../features/admin/propertySlice";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Button, IconButton } from "@mui/material";
import { FormInput } from "../../../../components/FormInput";
import { Api } from "../../../../helpers/api";
import { resolveFilePath } from "../../../../helpers/helpers";
import { AxiosError } from "axios";

function UpdateService() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const router = useRouter();

    const [form, setForm] = React.useState<Service>(undefined as Service)
    const [formError, setFormError] = React.useState<Service>({} as Service)
    const [errMessage, setErrMessage] = React.useState<{ status?: boolean, text: string }>({} as { status?: boolean, text: string })

    React.useEffect(() => {
        if (router.isReady === true && !loading) {
            _req()
        }
    }, [router.isReady])

    const _req = async () => {
        setLoading(true)
        try {
            const { data, status } = await Api().get<ApiResponse<Service>>(`/admin/services/view?slug=${router.asPath.split('/').pop()}`)
            setLoading(false)
            if (status !== 200 || data.status !== 'success') {
                return setErrMessage({
                    text: 'Failed to fetch Service'
                })
            }
            return setForm(data.data)
        } catch (error) {
            setLoading(false)
            setErrMessage({
                text: 'Failed to fetch Service'
            })
        }
    }


    const update = async () => {
        try {
            setLoading(true)
            const { data, status } = await Api().put<ApiResponse>("/admin/services/update", JSON.stringify({ ...form, amount: parseInt(form.amount.toString()) }))
            setLoading(false)
            if (status !== 200) return
            setErrMessage({
                status: data.status === 'success',
                text: data.message
            })
            if (data.status === 'success') {
                setTimeout(async () => {
                    await router.replace('/admin/services')
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
                    setFormError(_data.error !== undefined && _data.error as unknown as Service)
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
                        <IconButton onClick={router.back}>
                            <ArrowLeftIcon />
                        </IconButton>
                    </div>
                    <div className="flex justify-center">
                        <div className='rounded-md border my-4 mb-8 shadow-md relative max-w-4xl px-1 lg:px-4 w-full'>
                            <h1 className='red text-center mt-4'>
                                <div className="uppercase text-sm">Update Service</div>
                            </h1>
                            <h1 className={`text-center my-1 text-${!errMessage.status ? 'red' : 'blue'}-500`}>
                                <div className="font-serif text-sm">{errMessage.text}</div>
                            </h1>
                            {
                                form !== undefined && <form onSubmit={e => e.preventDefault()} action='' className='space-y-4 py-8 px-4 md:px-2 lg:px-4'>
                                    <div>
                                        <FormInput props={{
                                            title: 'Name',
                                            defaultValue: form.name,
                                            message: formError.name,
                                            required: true,
                                            name: 'name',
                                            handleChange: (s) => setForm({ ...form, name: s })
                                        }} />
                                    </div>
                                    <div>
                                        <PaymentPlans
                                            value={form.plan}
                                            handleChange={(s) => setForm({ ...form, plan: s })} />
                                    </div>
                                    <div>
                                        <textarea
                                            defaultValue={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            className='w-full border border-gray-300 p-2'
                                            placeholder="Decription"
                                        />
                                    </div>
                                    <div>
                                        <FormInput props={{
                                            title: 'Amount',
                                            defaultValue: form.amount,
                                            message: formError.amount as unknown as string,
                                            required: true,
                                            name: 'amount',
                                            type: 'number',
                                            handleChange: (s) => setForm({ ...form, amount: s })
                                        }} />
                                    </div>
                                    <div>
                                        <FormInput props={{
                                            title: 'Manager',
                                            message: formError.manager,
                                            required: true,
                                            defaultValue: form.manager,
                                            name: 'manager',
                                            handleChange: (s) => setForm({ ...form, manager: s })
                                        }} />
                                    </div>
                                    <div>
                                        <ImageUpload
                                            value={resolveFilePath(form.photo)}
                                            handleUpload={(s) => setForm({ ...form, photo: s })}
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            variant='outlined'
                                            disabled={loading}
                                            onClick={() => update()}
                                        >
                                            {!loading ? 'UPDATE' : 'Please wait...'}
                                        </Button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </React.Fragment>}
        </AdminDashboardLayout>
    );
}

export default UpdateService;
