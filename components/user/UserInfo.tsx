import { PencilIcon } from "@heroicons/react/solid"
import { resolveImagePath } from "../../helpers/helpers"
import { User } from "../../Typing.d"

export const UserInfo = ({ user, onEdit }: { user: User, onEdit: () => void }) => {
    return <>
        <div className="flex flex-row">
            <img src={resolveImagePath(user.photo)} className="rounded-full md:rounded-xl h-32 w-32 md:w-48 md:h-48 object-cover" />
            <div className="p-4 md:py-8">
                <div className="flex mt-2">
                    <div className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-36 md:w-48">
                        {`${user.fname} ${user.lname}`}
                    </div>
                    <div className="ml-4">
                        <PencilIcon className="text-black w-4" onClick={() => onEdit()} />
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