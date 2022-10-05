import { Edit, Visibility } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { money } from "../../helpers/helpers";
import { RootState, useAppDispatch } from "../../store";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { ApiResponse, Invoice } from "../../Typing";
import { Api } from "../../helpers/api";
import { toPng } from "html-to-image";
import { loadInvoices } from "../../redux/admin/admin";
import NewInvoice from "../../components/admin/NewInvoice";
import PrintInvoice from "../../components/admin/PrintInvoice";
import GridTable from "../../components/Grid";


const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'item',
        headerName: 'Item',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 350,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 80,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ row }) => <div> {money(row.amount)} </div>
    },
    {
        field: 'fname',
        headerName: 'Attendant',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 250,
        renderCell: ({ row }) => <div> {row.lname} {row.fname} </div>
    },
    {
        field: '',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 30,
        renderCell: ({ row }) => <div className="cursor-pointer" onClick={() => row.view()}> <Visibility fontSize="small" /> </div>
    },
];


function Page() {
    const { data, state } = useSelector((store: RootState) => store.invoiceSlice)
    const dispatch = useAppDispatch()
    const [newFormOpen, setNewFormOpen] = React.useState<boolean>(false)
    const [preview, setPreview] = React.useState<{
        open: boolean
        invoice?: Invoice
    }>({
        open: false
    })

    const refNewForm = React.createRef<{
        data: Invoice,
        message?: React.Dispatch<React.SetStateAction<JSX.Element>>
    }>()
    const refPreview = React.createRef<HTMLDivElement>()

    React.useEffect(() => {
        dispatch(loadInvoices())
    }, [])

    const toggleNewForm = () => setNewFormOpen(!newFormOpen)

    const createNew = async (loading: any) => {
        if (refNewForm.current.data.quantity < 1 || refNewForm.current.data.amount < 1) return
        loading.busy()
        refNewForm.current.message(undefined)
        try {
            const { data } = await Api().post<ApiResponse<Invoice>>('/admin/invoice', {
                ...refNewForm.current.data,
                amount: parseInt(refNewForm.current.data.amount.toString()),
                quantity: parseInt(refNewForm.current.data.quantity.toString())
            })
            refNewForm.current.message(<div className="text-blue-500">{'Created successfully'}</div>)
            setTimeout(() => {
                setNewFormOpen(false)
                setPreview({
                    open: true,
                    invoice: data.data
                })
            }, 800)
        } catch (error) {
            refNewForm.current.message(<div className="text-red-500">{'Error connecting to server'}</div>)
        }
        loading.idle()
    }

    const closePreview = () => {
        setPreview({ open: false })
        dispatch(loadInvoices())
    }

    const handlePrint = async () => {
        const frameId = 'frameID'
        const parentId = 'elementID'
        try {
            if (document.getElementById(frameId) !== null) { document.removeChild(document.getElementById(frameId)) }
            const frame = document.createElement("iframe")
            frame.id = frameId
            frame.style.position = "absolute";
            frame.style.top = "-10000px";
            frame.style.width = '302.362204728px'
            document.body.appendChild(frame);

            const img = document.createElement("img")
            img.src = await toPng(refPreview.current, { quality: 1 })

            const parent = document.createElement("div")
            parent.style.display = "flex"
            parent.style.justifyContent = "center"
            parent.appendChild(img)
            parent.id = parentId
            frame.contentWindow.document.getElementsByTagName("body")[0].style.width = '100%'
            frame.contentWindow.document.getElementsByTagName("body")[0].append(parent)
            setTimeout(() => {
                const i = setInterval(function () {
                    if (frame.contentWindow.document.getElementById(parentId) !== null) {
                        frame.focus();
                        frame.contentDocument.title = 'invoice-' + preview.invoice.id
                        frame.contentWindow.print();
                        closePreview()
                        frame.parentNode.removeChild(frame);
                        clearInterval(i)
                    }
                }, 500);
            }, 2000)
            window.focus();
        } catch (error) {
            console.log(error)
        }
    }

    return <AdminDashboardLayout>
        {({ loading }) => (
            <React.Fragment>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg red'>Invoice & Printing</h1>

                    <Button variant='outlined' size='small'
                        onClick={toggleNewForm}>
                        NEW
                    </Button>
                </div>
                <Dialog
                    open={newFormOpen}
                    onClose={toggleNewForm}
                >
                    <DialogContent className="max-w-lg w-[90vw] px-2">
                        <NewInvoice ref={refNewForm} />
                    </DialogContent>
                    <DialogActions>
                        <div className="mx-auto w-32">
                            <Button
                                variant="outlined"
                                size='small'
                                fullWidth
                                onClick={() => createNew(loading)}
                                disabled={loading.state}
                                startIcon={loading.state && <CircularProgress size={14} />}
                            >
                                SAVE
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={preview.open}
                    onClose={closePreview}
                >
                    <DialogContent className="max-w-lg w-[90vw] px-2">
                        {preview.invoice !== undefined && <PrintInvoice ref={refPreview} invoice={preview.invoice} />}
                    </DialogContent>
                    <DialogActions>
                        <div className="mx-auto w-32">
                            <Button
                                variant="outlined"
                                size='small'
                                fullWidth
                                onClick={handlePrint}
                                disabled={loading.state}
                                startIcon={loading.state && <CircularProgress size={14} />}
                            >
                                PRINT
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <div className="h-[80vh] py-4">
                    <GridTable
                        state={state}
                        columns={columns}
                        rows={data.map((invoice, i) => ({
                            ...invoice, _id: i + 1, view: () => setPreview({
                                open: true,
                                invoice: invoice,
                            })
                        }))}
                    />
                </div>
            </React.Fragment>
        )}
    </AdminDashboardLayout>
}

export default Page;
