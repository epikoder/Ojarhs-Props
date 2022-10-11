import { OjarhAddress, OjarhPhone } from "../../config"
import { money } from "../../helpers/helpers"
import { Receipt, User } from "../../Typing.d"
import React from "react"
import { Logo } from "../Logo"

const ReceiptComponent = React.forwardRef<HTMLDivElement, {
    user: User
    receipt: Receipt,
}>
    ((props, ref) => {
        const user = props.user
        const receipt = props.receipt
        return <>
            <div className="w-[500px] min-h-[500px] bg-white text-black">
                <div ref={ref} className="w-[500px] min-h-[700px] bg-white px-8 py-16">
                    <div className="flex justify-between px-4 items-center">
                        <Logo height={200} width={200} textColor={'0c0d0d'} />
                        <div>
                            <span className="text-sm uppercase">Receipt</span> <span className="font-semibold">#{receipt.id}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                        <div>
                            <div className="font-bold">
                                Ojarh Properties
                            </div>
                            <div>
                                {OjarhPhone}
                            </div>
                            <div>
                                {OjarhAddress}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold">
                                {user.lname} {user.fname}
                            </div>
                            <div>
                                {user.phone}
                            </div>
                            <div className="two-lines ellipse">
                                {user.address}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-9 gap-1 text-sm font-semibold px-2 bg-red-600 text-white">
                            <div className="col-span-1 border-r border-white py-2">
                                ID
                            </div>
                            <div className="col-span-2 text-center border-r border-white py-2">
                                ITEM
                            </div>
                            <div className="col-span-4 text-center border-r border-white py-2">
                                DESCRIPTION
                            </div>
                            <div className="col-span-2 text-right py-2">
                                AMOUNT
                            </div>
                        </div>

                        <div className="flex flex-col justify-between min-h-[200px]">
                            <div className="grid grid-cols-9 gap-1 text-sm px-2 border-y-gray-300 border-y-2">
                                <div className="col-span-1 border-r border-gray-300 py-2">
                                    1
                                </div>
                                <div className="col-span-2 text-center border-r border-gray-300 py-2">
                                    {receipt.type}
                                </div>
                                <div className="col-span-4 text-center border-r border-gray-300 py-2">
                                    {receipt.name}
                                </div>
                                <div className="col-span-2 text-right py-2">
                                    {money(receipt.amount)}
                                </div>
                            </div>
                            <div className="grid grid-cols-9 gap-1 text-sm px-2 border-y-gray-300 border-y-2 font-semibold bg-red-600 text-white">
                                <div className="col-span-7 py-2">
                                    TOTAL
                                </div>
                                <div className="col-span-2 text-right py-2 ">
                                    {money(receipt.amount)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="m-4 mx-auto justify-center items-center text-center w-full">
                        <div>
                            <div className="text-sm p-1">Thank you for your patronage</div>
                            <i className="text-xs">Ojarh properties</i>
                        </div>
                    </div>
                </div>

            </div>
        </>
    })
ReceiptComponent.displayName = 'ReceiptComponent'
export { ReceiptComponent }