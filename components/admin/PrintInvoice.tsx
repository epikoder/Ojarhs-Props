import React from "react"
import { OjarhAddress, OjarhPhone } from "../../constants"
import { money } from "../../helpers/helpers"
import { Invoice } from "../../Typing"

const PrintInvoice = React.forwardRef<HTMLDivElement, { invoice: Invoice }>(({ invoice }, ref) => {
    return <>
        <div className="w-full flex justify-center">
            <div ref={ref} className='p-4 text-sm bg-white' style={{
                width: 302.362204728
            }}>
                <div className="flex justify-between items-center">
                    <div style={{
                        backgroundImage: `url(/image/logo.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }} className="w-24 h-24"></div>
                    <div>
                        <span className="text-sm uppercase">INVOICE</span> <span className="font-semibold">
                            #{invoice.id}
                        </span>
                    </div>
                </div>
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

                <div className="text-xs my-2">
                    <div className="grid grid-cols-6 p-1 border border-black">
                        <div className="col-span-2 border-r border-black">
                            ITEM
                        </div>
                        <div className="col-span-4 text-right">
                            {invoice.item}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 p-1 border border-black">
                        <div className="col-span-2 border-r border-black">
                            DESCRIPTION
                        </div>
                        <div className="col-span-4 text-right">
                            {invoice.description}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 p-1 border border-black">
                        <div className="col-span-2 border-r border-black">
                            QUANTITY
                        </div>
                        <div className="col-span-4 text-right">
                            {invoice.quantity}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 p-1 border border-black">
                        <div className="col-span-2 border-r border-black">
                            AMOUNT
                        </div>
                        <div className="col-span-4 text-right">
                            {money(invoice.amount)}
                        </div>
                    </div>
                </div>
                <div className="my-8 text-sm">
                    <div className="grid grid-cols-6 p-1">
                        <div className="col-span-2">
                            MANAGER:
                        </div>
                        <div className="col-span-4 flex flex-col w-full">
                            <div className="border-b border-black h-6">

                            </div>
                            <div className="text-center text-xs">
                                <i>signature</i>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 p-1">
                        <div className="col-span-2">
                            STAFF:
                        </div>
                        <div className="col-span-4 flex flex-col w-full">
                            <div className="border-b border-black h-6">

                            </div>
                            <div className="text-center text-xs">
                                <i>{invoice.lname} {invoice.fname}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-4 mx-auto justify-center items-center text-center w-full">
                    <div>
                        <div className="text-xs p-1">Thank you for your patronage</div>
                        <i className="text-xs">Ojarh properties</i>
                    </div>
                </div>
            </div>
        </div>
    </>
})

PrintInvoice.displayName = 'PrintInvoice'
export default PrintInvoice