import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import Image from "next/image"
import React from "react"
import { CopyRight } from "../../components/Copyright"
import Loader from "../../components/Loader"

const PasswordInput = ({ onChange }: { onChange?: (s: string) => void }) => {
    const [visible, setVisible] = React.useState<boolean>(false)

    return <div className="p-1 m-1">
        <div className="text-sm text-slate-600">
            Password
        </div>
        <div className=" w-full flex px-3 py-1 rounded-md bg-slate-200">
            <input type={visible ? "text" : "password"} className="outline-none text-black bg-transparent rounded-md w-[95%]"
                placeholder="**********" />
            <div className="w-5 relative" onClick={() => setVisible(!visible)}>
                <EyeIcon className={`absolute ${visible ? 'hidden' : ''}`} />
                <EyeOffIcon className={`absolute ${visible ? '' : 'hidden'}`} />
            </div>
        </div>
    </div>
}
const AdminLogin = () => {
    const [loading, setLoading] = React.useState<boolean>(false)

    const submit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    return <React.Fragment>
        <div className="w-full h-[100vh] flex">
            <div className="hidden lg:block h-full w-[60vw] bg-slate-500">
                <img
                    src={"/image/tower.jpg"}
                    className="h-full w-full object-cover" />
            </div>
            <div className="h-full w-full lg:w-[40vw] flex flex-col items-center justify-center">
                {loading && <div className="absolute z-10 h-[100vh] inset-0 lg:left-[60vw]" style={{ backgroundColor: '#04040414' }}>
                    <Loader />
                </div>}
                <div className="w-[90%] sm:w-[80%] flex flex-col justify-between shadow-md p-4">
                    <form action="" className="p-4">
                        <h1 className="text-center text-lg text-slate-800 font-semibold my-4">
                            Login
                        </h1>
                        <div className="p-1 m-1">
                            <div className="text-sm text-slate-600">
                                Email Address
                            </div>
                            <input type="text" className="outline-none bg-slate-200 text-black px-3 py-1 rounded-md w-full"
                                placeholder="johndoe@mail.com" />
                        </div>
                        <PasswordInput />
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
    </React.Fragment>
}
export default AdminLogin