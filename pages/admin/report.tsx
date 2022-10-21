import { Add, Notifications } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { ChatList } from "../../components/ChatComponents";
import { Table } from "../../components/Table";
import { loadAdminReports } from "../../actions/admin/admin";
import { RootState, useAppDispatch } from "../../store";
import { MessageOwner } from "../../Typing.d";

const ChatListGenerator = ({ o }: { o: MessageOwner }) => {
    const message = o.messages[o.messages.length - 1]
    return <>
        <ChatList message={message} title={o.title} route='/admin/report/chat' />
    </>
}

function Page() {
    const { data, state } = useSelector((store: RootState) => store.messageSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        dispatch(loadAdminReports())
    }, [dispatch])

    return <AdminDashboardLayout>
        {
            () => <React.Fragment>
                <div className="flex justify-between items-center shadow-md rounded-md p-2 lg:p-4 my-2">
                    <div className="text-sm lg:text-lg">
                        Reports
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="hidden: md:flex justify-around">
                            <Notifications fontSize='small' />
                        </div>
                        <div>
                            <Button
                                variant='outlined'
                                size='small'
                                startIcon={<Add fontSize="small" />}
                                onClick={() => router.push('/admin/report/new')}
                            >
                                Report
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="my-2 h-full p-1">
                    <Table
                        state={state}
                        data={data}
                        tableBody={(o: MessageOwner, i: number) => <div key={i} className='my-1'>
                            <ChatListGenerator o={o} />
                        </div>}
                        tableHead={() => <></>}
                    />
                </div>
            </React.Fragment>
        }
    </AdminDashboardLayout>
}

export default Page;
