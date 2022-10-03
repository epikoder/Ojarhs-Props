import { TextField } from "@mui/material"
import React from "react"
import { Invoice, InvoiceItem } from "../../Typing"

const NewInvoice = React.forwardRef<{
    data: InvoiceItem[],
    message?: React.Dispatch<React.SetStateAction<JSX.Element>>
}, any>((props, ref) => {
    const [form, setForm] = React.useState<InvoiceItem[]>([])
    const [message, setMessage] = React.useState<JSX.Element>()

    React.useImperativeHandle(ref, () => {
        return {
            data: form,
            message: setMessage
        }
    })

    return <>
        <div className="p-2">
            <div className="text-red-500 p-4 text-center">
                NEW INVOICE
            </div>
            <form action="" className=" space-y-2">
                <div className="text-center text-sm">
                    {message}
                </div>
                {/* <div>
                    <TextField
                        label='Name'
                        size='small'
                        fullWidth
                        value={form.item}
                        onChange={e => setForm({ ...form, item: e.target.value })}
                    />
                </div>
                <div>
                    <textarea
                        placeholder='Description'
                        value={form.description}
                        className='p-2 border border-gray-300 rounded-md w-full h-32'
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />
                </div>
                <div>
                    <TextField
                        label='Quantity'
                        size='small'
                        fullWidth
                        value={form.quantity}
                        onChange={e => setForm({ ...form, quantity: e.target.value as unknown as number })}
                    />
                </div>
                <div>
                    <TextField
                        label='Amount'
                        size='small'
                        type={'number'}
                        fullWidth
                        value={form.amount}
                        onChange={e => setForm({ ...form, amount: e.target.value as unknown as number })}
                    />
                </div> */}
            </form>
        </div>
    </>
})

NewInvoice.displayName = 'NewInvoice'
export default NewInvoice