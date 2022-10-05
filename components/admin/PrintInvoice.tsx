import React from "react"
import { OjarhAddress, OjarhPhone } from "../../constants"
import { money } from "../../helpers/helpers"
import { Invoice } from "../../Typing"
import { Logo } from "../Logo"

const PrintInvoice = React.forwardRef<HTMLDivElement, { invoice: Invoice }>(({ invoice }, ref) => {
    return <>
        <div className="w-full flex justify-center">
            <div ref={ref} id='print-page' className='p-4 text-sm bg-white border border-black text-black' style={{
                width: 302.362204728
            }}>
                <div className="flex justify-center items-center">
                    <Logo height={200} textColor={'0c0d0d'} />
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold">
                        Ojarh Properties
                    </div>
                    <div className="text-gray-600">
                        {OjarhPhone}
                    </div>
                    <div className="px-4 text-center text-sm text-gray-600">
                        {OjarhAddress}
                    </div>
                </div>
                <div className="text-xl uppercase text-center">
                    <span>INVOICE</span> <span className="font-semibold">
                        #{invoice.id}
                    </span>
                </div>
                <div className="text-xs uppercase">
                    <table className="border-spacing-px border border-gray-700 text-center border-separate w-full">
                        <thead>
                            <tr className="font-bold">
                                <td className="p-px py-1 border-b border-gray-500">
                                    ITEM
                                </td>
                                <td className="border-x py-1 border-b border-gray-500 px-2">
                                    DESCRIPTION
                                </td>
                                <td className="p-px py-1 border-b border-gray-500">
                                    QUANTITY
                                </td>
                                <td className="border-l border-b py-1 border-gray-500 p-px">
                                    AMOUNT
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((i, k) =>
                                <tr className="space-x-2" key={k}>
                                    <td className="p-px py-2 border-gray-500">
                                        {i.item}
                                    </td>
                                    <td className="border-x py-2 border-gray-500 p-px">
                                        {i.description}
                                    </td>
                                    <td className="p-px py-2 border-gray-500">
                                        {i.quantity}
                                    </td>
                                    <td className="border-l py-2 border-gray-500 p-px">
                                        {money(i.amount)}
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                    <div className="py-2 w-[269px] flex items-center justify-between uppercase font-bold">
                        <div>
                            TOTAL
                        </div>
                        <div className="text-right">
                            {money(invoice.total)}
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <div>
                            Date:
                        </div>
                        <i className="underline">
                            {(new Date(invoice.created_at)).toLocaleDateString()}
                        </i>
                    </div>
                </div>
                <div className="my-4 text-sm">
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