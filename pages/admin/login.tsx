import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { CopyRight } from "../../components/Copyright"
import { FormInput, FormPasswordInput } from "../../components/FormInput"
import Loader from "../../components/Loader"
import { checkIsAuthenticated } from "../../features/authSlice"
import { loginAdminApi } from "../../redux/auth"
import { RootState, useAppDispatch } from "../../store"


type LoginForm = {
    email: string
    password: string
}

const AdminLogin = () => {
    const [form, setForm] = React.useState<LoginForm>({} as LoginForm)
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
            <div className="lg:max-w-[95%] max-h-[90%] shadow-lg shadow-slate-500 drop-shadow-lg bg-white flex">
                <div className="hidden lg:block h-full w-[60vw] bg-slate-500">
                    <img
                        src={"/image/tower.jpg"}
                        className="h-full w-full object-cover" />
                </div>
                <div className="h-full sm:h-[60vh] lg:h-full w-full sm:w-[40vw] lg:w-[40vw] flex flex-col items-center justify-center shadow-md relative">
                    {(status === 'pending' || appState === 'pending') && <div className="absolute z-10 inset-0" style={{ backgroundColor: '#04040414' }}>
                        <Loader />
                    </div>}
                    <div className="flex flex-col justify-between p-4">
                        <form action="" className="p-4" ref={ref}>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={"/image/logo.png"}
                                    className="w-10 lg:w-16 h-10 " />
                            </div>
                            <h1 className="text-center text-lg text-slate-800 font-semibold my-4">
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
                            <FormPasswordInput
                                props={{
                                    title: 'Password',
                                    hidden: show,
                                    name: 'password',
                                    handleChange: (s) => setForm({ ...form, password: s })
                                }}
                            />
                            <label
                                className='form-check-label inline-block text-gray-500 text-sm items-center p-1'
                                htmlFor='flexCheckDefault'
                            >
                                <input
                                    className='form-check-input appearance-none h-5 w-5 border border-gray-300  rounded-sm bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                                    type='checkbox'
                                    value=''
                                    id='flexCheckDefault'
                                    onChange={(e) => setRemember(!remember)}
                                />
                                <span>Remember Me</span>
                            </label>
                            <div className="p-1 m-1 flex justify-between">
                                <div className="text-sm text-red-500 cursor-pointer" onClick={() => { }}>
                                    Forgot password ?
                                </div>
                                <div
                                    onClick={submit}
                                    className="uppercase text-sm cursor-pointer text-white bg-black rounded-md px-2 py-1 border border-black hover:bg-white hover:text-black duration-300 transition-all ease-in-out">
                                    submit
                                </div>
                            </div>
                        </form>
                        <CopyRight className="text-red-500 text-sm" />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default AdminLogin