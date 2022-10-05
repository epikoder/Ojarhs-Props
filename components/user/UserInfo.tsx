import { PencilIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { resolveFilePath } from "../../helpers/helpers";
import { User } from "../../Typing.d";
import CountDownTimer from "./Countdown";

export const UserInfo = ({ user }: { user: User }) => {
    const router = useRouter()
    return <>
        <div className="flex flex-row items-start">
            <img src={resolveFilePath(user.photo)} className="rounded-full md:rounded-xl h-32 w-32 md:w-48 md:h-48 object-cover" />
            <div className="px-4">
                <div className="flex mt-2">
                    <div className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap md:w-48">
                        {`${user.fname} ${user.lname}`}
                    </div>
                    <div className="ml-4">
                        <PencilIcon className="w-4" onClick={() => router.push('/user/edit-profile')} />
                    </div>
                </div>
                <div className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-36 md:w-60">
                    {user.email}
                </div>
                <div className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-36 md:w-60">
                    {user.phone}
                </div>
                <div className="text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-36 md:w-60 lg:w-[40vh] my-2">
                    {user.address}
                </div>
            </div>
        </div>
    </>
}
