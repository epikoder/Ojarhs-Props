import { Add, Delete } from "@mui/icons-material"
import { Button, Card, IconButton, TextField } from "@mui/material"
import React from "react"
import List from "../../helpers/list"
import { Invoice, InvoiceItem } from "../../Typing"

const invoiceItem: Readonly<InvoiceItem> = {
    amount: 1,
    description: '',
    item: '',
    quantity: 1
}

const InvoiceForm = React.forwardRef<InvoiceItem, {
    index: number,
    data: InvoiceItem,
    remove: VoidFunction,
    key: string
    handleChange: (value: InvoiceItem) => void
}>((props, ref) => {
    const { index, data, remove, handleChange, key } = props
    const [form, setForm] = React.useState<InvoiceItem>(data || invoiceItem)

    React.useEffect(() => {
        handleChange(form)
    }, [form])

    return <Card className="grid grid-cols-8 gap-1 items-start px-1 py-2" key={key}>
        <div className="w-8 text-center space-y-4">
            <div>
                #{index + 1}
            </div>
            <IconButton color="error" onClick={remove}>
                <Delete />
            </IconButton>
        </div>
        <div className="space-y-2 col-span-7">
            <div>
                <TextField
                    label='Item'
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
                    className='p-2 border border-gray-300 rounded-md w-full h-32 bg-transparent'
                    onChange={e => setForm({ ...form, description: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    label='Quantity'
                    size='small'
                    fullWidth
                    value={form.quantity}
                    error={form.quantity < 1}
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
                    error={form.amount < 1}
                    onChange={e => setForm({ ...form, amount: e.target.value as unknown as number })}
                />
            </div>
        </div>
    </Card>
})
InvoiceForm.displayName = 'InvoiceForm'

const NewInvoice = React.forwardRef<{
    data: InvoiceItem[],
    message?: React.Dispatch<React.SetStateAction<JSX.Element>>
}, any>((props, ref) => {
    const [form, setForm] = React.useState<InvoiceItem[]>([invoiceItem])
    const [message, setMessage] = React.useState<JSX.Element>()
    const builderRef = React.useRef<HTMLDivElement>()

    React.useImperativeHandle(ref, () => {
        return {
            data: form,
            message: setMessage
        }
    })

    React.useEffect(() => {
        if (builderRef.current !== undefined) {
            builderRef.current.scrollTop = builderRef.current.scrollHeight
        }
    }, [form, builderRef])

    const add = () => {
        setForm([...form, invoiceItem])
    }

    const remove = (index: number) => {
        setForm(List.remove<InvoiceItem>(form, index))
    }

    return <>
        <div className="p-2">
            <div className="p-4 text-center">
                NEW INVOICE
            </div>
            <form action="" className=" space-y-2">
                <div className="text-center text-sm">
                    {message}
                </div>
                <div className="h-[80vh] space-y-4 overflow-y-scroll" ref={builderRef}>
                    {form.map((f, i) => <InvoiceForm
                        key={`${i}-${f.item}`}
                        handleChange={(v) => {
                            let f = form
                            f[i] = v
                            setForm(f)
                        }} remove={() => remove(i)} data={f} index={i} />
                    )}
                    <Button
                        fullWidth
                        color={'success'}
                        onClick={add}
                        variant='outlined'
                        startIcon={<Add fontSize="medium" />} >
                        ADD
                    </Button>
                </div>
            </form>
        </div>
    </>
})

NewInvoice.displayName = 'NewInvoice'
export default NewInvoice