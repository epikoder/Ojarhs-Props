import { Button, Card } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { CopyRight } from "../../components/Copyright"
import { FormInput, FormPasswordControlledInput } from "../../components/FormInput"
import Loader from "../../components/Loader"
import { Logo } from "../../components/Logo"
import { checkIsAuthenticated } from "../../features/authSlice"
import { loginAdminApi } from "../../actions/auth"
import { RootState, useAppDispatch } from "../../store"


type LoginForm = {
    email: string
    password: string
}

const AdminLogin = () => {
    const [form, setForm] = React.useState<LoginForm>({
        email: '',
        password: ''
    } as LoginForm)
    const [message, setMessage] = React.useState<{ text?: string, status?: boolean }>({});
    const [remember, setRemember] = React.useState<boolean>(false);
    const { authenticated, user, status, message: errMessage, appState } = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const ref = React.useRef<HTMLFormElement>()
    const { show } = useSelector((store: RootState) => store.togglePassword)

    React.useEffect(() => {
        if (authenticated) return
        dispatch(checkIsAuthenticated({ isAdmin: true }))
    }, [authenticated, dispatch])

    React.useEffect(() => {
        if (authenticated && user.is_admin) setTimeout(() => {
            const path = sessionStorage.getItem('current')
            router.replace(path !== null && (path !== '/admin/login' && !path.includes('/user/') && path !== '/') ? path : '/admin/dashboard')
        }, 200)
    }, [authenticated, router, user])

    React.useEffect(() => {
        setMessage({
            text: errMessage,
            status: status === 'success'
        })
    }, [errMessage, status])

    React.useEffect(() => {
        localStorage.setItem('persist_auth', `${remember}`)
    }, [remember])

    const submit = () => {
        const f = ref.current
        if (f === undefined || !f.checkValidity()) return
        setMessage({
            text: undefined,
        })
        dispatch(loginAdminApi(form))
    }

    return <React.Fragment>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center" style={{ backgroundColor: '#b0b8bf' }}>
            <div className="lg:max-w-[95%] max-h-[90%] shadow-lg shadow-slate-500 drop-shadow-lg flex">
                <div className="hidden lg:block h-full w-[60vw]">
                    <img
                        src={"/image/tower.jpg"}
                        className="h-full w-full object-cover" />
                </div>
                <Card className="h-full sm:h-[60vh] lg:h-full w-[90vw] lg:w-[40vw] flex flex-col items-center justify-center shadow-md relative">
                    {(status === 'pending' || appState === 'pending') && <div className="absolute z-10 inset-0" style={{ backgroundColor: '#04040414' }}>
                        <Loader />
                    </div>}
                    <div className="flex flex-col justify-between p-4 w-full">
                        <form action="" className="p-4" ref={ref}>
                            <div className="flex justify-center mb-4">
                                <Logo height={100} textColor='white' />
                            </div>
                            <h1 className="text-center text-lg font-semibold my-4">
                                Login
                            </h1>
                            <div className={`text-center text-sm font-sans text-${message.status ? 'blue' : 'red'}-500`}>
                                {message.text !== undefined && message.text}
                            </div>
                            <FormInput props={{
                                title: "Email",
                                name: "email",
                                required: true,
                                value: form.email,
                                handleChange: function (s: any): void {
                                    setForm({ ...form, email: s })
                                }
                            }} />
                            <FormPasswordControlledInput
                                props={{
                                    title: 'Password',
                                    hidden: show,
                                    name: 'password',
                                    handleChange: (s) => setForm({ ...form, password: s })
                                }}
                            />
                            <label
                                className='form-check-label inline-block text-sec text-sm items-center p-1'
                                htmlFor='flexCheckDefault'
                            >
                                <input
                                    className='form-check-input appearance-none h-5 w-5 border checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                                    type='checkbox'
                                    value=''
                                    id='flexCheckDefault'
                                    onChange={(e) => setRemember(!remember)}
                                />
                                <span>Remember Me</span>
                            </label>
                            <div className="p-1 m-1 flex justify-between">
                                <div className="text-sm text-sec cursor-pointer" onClick={() => { }}>
                                    Forgot password ?
                                </div>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    onClick={submit}>
                                    LOGIN
                                </Button>
                            </div>
                        </form>
                        <CopyRight className="text-sec text-sm" />
                    </div>
                </Card>
            </div>
        </div >
    </React.Fragment >
}
export default AdminLogin