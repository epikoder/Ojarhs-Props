import { Edit, Visibility } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { money } from "../../helpers/helpers";
import { RootState, useAppDispatch } from "../../store";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { ApiResponse, Invoice, InvoiceItem } from "../../Typing";
import { Api } from "../../helpers/api";
import { toPng } from "html-to-image";
import { loadInvoices } from "../../actions/admin/admin";
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
        field: 'count',
        headerName: 'Items',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        renderCell: ({ row }: { row: Invoice }) => <div> {row.items.length} </div>
    },
    {
        field: 'total',
        headerName: 'Total',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 200,
        renderCell: ({ row }) => <div> {money(row.total)} </div>
    },
    {
        field: 'fname',
        headerName: 'Attendant',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 300,
        renderCell: ({ row }) => <div> {row.lname} {row.fname} </div>
    },
    {
        field: 'action',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 30,
        renderCell: ({ row }) => <IconButton className="cursor-pointer" onClick={() => row.view()}> <Visibility fontSize="small" /> </IconButton>
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
    const [_loading, setLoading] = React.useState<boolean>(false)

    const refNewForm = React.createRef<{
        data: InvoiceItem[],
        message?: React.Dispatch<React.SetStateAction<JSX.Element>>
    }>()
    const refPreview = React.createRef<HTMLDivElement>()

    React.useEffect(() => {
        dispatch(loadInvoices())
    }, [])

    const toggleNewForm = () => setNewFormOpen(!newFormOpen)

    const createNew = async (loading: any) => {
        loading.busy()
        refNewForm.current.message(undefined)
        try {
            const body: Partial<Invoice> = {
                items: refNewForm.current.data.map(i => ({
                    ...i, amount: parseInt(i.amount.toString()),
                    quantity: parseInt(i.quantity.toString())
                })),
            }
            const { data } = await Api().post<ApiResponse<Invoice>>('/admin/invoice', body)
            refNewForm.current.message(<div className="text-blue-500">{'Created successfully'}</div>)
            setTimeout(() => {
                setNewFormOpen(false)
                setPreview({
                    open: true,
                    invoice: data.data
                })
            }, 800)
        } catch (error) {
            loading.idle()
            switch (error.response.status) {
                case 400: {
                    refNewForm.current.message(<div className="text-red-500">{'Please validate the form'}</div>)
                    break
                }
                default: refNewForm.current.message(<div className="text-red-500">{'Error connecting to server'}</div>)
            }
        }
        loading.idle()
    }

    const closePreview = () => {
        setPreview({ open: false })
        dispatch(loadInvoices())
    }

    const handlePrint = async () => {
        setLoading(true)
        const frameId = 'frameID'
        const parentId = 'elementID'
        const width = '302.362204728px'
        try {
            const frame = document.createElement("iframe")
            frame.id = frameId
            frame.style.position = "absolute";
            frame.style.top = "-10000px";
            frame.style.width = width
            document.body.appendChild(frame);

            const img = document.createElement("img")
            console.log('GOT HERE', refPreview.current)
            img.src = await toPng(refPreview.current || document.getElementById('print-page') as HTMLDivElement, { quality: 1 })
            img.width = 302.362204728

            const parent = document.createElement("div")
            parent.style.display = "flex"
            parent.style.justifyContent = "center"
            parent.appendChild(img)
            parent.id = parentId
            frame.contentWindow.document.getElementsByTagName("body")[0].style.width = '100%'
            frame.contentWindow.document.getElementsByTagName("body")[0].append(parent)
            setTimeout(() => {
                const i = setInterval(function () {
                    console.log((frame.contentWindow.document || frame.contentDocument))
                    if ((frame.contentWindow.document || frame.contentDocument).readyState === 'complete') {
                        frame.focus();
                        frame.contentDocument.title = 'invoice-' + preview.invoice.id
                        frame.contentWindow.print();
                        setLoading(false)
                        closePreview()
                        frame.parentNode.removeChild(frame);
                        clearInterval(i)
                    }
                }, 500);
            }, 2000)
            window.focus();
        } catch (error) {
            console.log(error)
            setLoading(false)
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
                                disabled={_loading}
                                startIcon={_loading && <CircularProgress size={14} />}
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
