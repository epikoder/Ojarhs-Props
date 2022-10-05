import { ArrowForward, Cancel, Download } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { ReceiptComponent } from "../../components/user/Receipt";
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { addMonth, money } from "../../helpers/helpers";
import { loadUserProperties, loadUserReceipt, loadUserServices } from "../../actions/user/dashboard";
import { RootState, useAppDispatch } from "../../store";
import { Receipt, Service, Space } from "../../Typing.d";
import { toPng } from 'html-to-image';


const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        type: 'number',
        renderCell: ({ value }) => <div>{money(value)}</div>
    },
    {
        field: 'created_at',
        headerName: 'Date',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
    },
    {
        field: 'expires',
        headerName: 'Expires On',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
    },
    {
        field: 'slug',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 20,
        renderCell: ({ row }) => <Action row={row} />
    },
];

const Action = ({ row }: { row: any }) => {
    return <div >
        <ArrowForward onClick={() => row.action()} fontSize="small" />
    </div>
}


const Page = () => {
    const { data } = useSelector((store: RootState) => store.accountSlice.receipts)
    const dispatch = useAppDispatch()
    const ref = React.useRef<HTMLDivElement>()

    const [preview, setPreview] = React.useState<{
        isOpen: boolean,
        receipt?: Receipt
    }>({
        isOpen: false,
    })

    React.useEffect(() => {
        dispatch(loadUserReceipt({}))
    }, [])

    const onPreview = (r: Receipt) => {
        setPreview({ isOpen: true, receipt: r })
    }

    const handlePrint = async () => {
        try {
            var r = await toPng(ref.current)
            const a = document.createElement("a")
            a.href = r
            a.download = "receipt-" + preview.receipt.id + ".png"
            a.click()
        } catch (error) {
            console.log(error)
        }
        setPreview({ isOpen: false })
    }
    return <UserDashboardLayout>
        {({ user }) => <>
            <div className="h-[90vh] md:h-full p-2 lg:p-4">
                <div>
                    Receipts
                </div>
                <div className="h-full p-2">
                    <Dialog open={preview.isOpen} onClose={() => setPreview({ isOpen: false })} >
                        <DialogContent>
                            {preview.receipt !== undefined && <ReceiptComponent ref={ref} user={user} receipt={preview.receipt} />}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                fullWidth
                                variant="outlined"
                                size='small'
                                onClick={handlePrint}
                                startIcon={<Download fontSize="small" />}
                            >
                                DOWNLOAD
                            </Button>
                        </DialogActions>
                        <DialogActions>
                            <Button
                                fullWidth
                                variant="outlined"
                                size='small'
                                sx={{
                                    color: 'red'
                                }}
                                onClick={() => setPreview({ isOpen: false })}
                                startIcon={<Cancel fontSize="small" className="text-red-500" />}
                            >
                                CLOSE
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <DataGrid
                        columns={columns}
                        rows={data.map((e, i) => ({ ...e, _id: i + 1, action: () => onPreview(e) }))}
                    />
                </div>

            </div>
        </>}
    </UserDashboardLayout>
}

export default Page