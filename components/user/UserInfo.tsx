import { Edit } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useRouter } from "next/router"
import { resolveFilePath } from "../../helpers/helpers"
import { User } from "../../Typing.d"

import React from "react";
import RandomData from "./RandomData";

export const UserInfo = ({ user }: { user: User }) => {   
    const router = useRouter()
    return <>
        <div className="flex items-start">
            <img src={resolveFilePath(user.photo)} className="rounded-full md:rounded-xl h-32 w-32 md:w-48 md:h-48 object-cover" />
            <div className="px-4">
                <div className="flex mt-2">
                    <div className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                        {`${user.fname} ${user.lname}`}
                    </div>
                    <IconButton className="ml-4" onClick={() => router.push('/user/edit-profile')}>
                        <Edit fontSize="small" />
                    </IconButton>
                </div>
                <div className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-44 md:w-60">
                    {user.email}
                </div>
                <div className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-44 md:w-60">
                    {user.phone}
                </div>
                <div className="text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-40 md:w-60 lg:w-[40vh] my-2">
                    {user.address}
                </div>
                <div>
                  <RandomData />
                </div>
            </div>
        </div>
    </>

}