import { Add } from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { ChatList } from "../../components/ChatComponents";
import { Table } from "../../components/Table";
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout";
import { loadUserConversations } from "../../actions/user/message";
import { RootState, useAppDispatch } from "../../store";
import { MessageOwner } from "../../Typing.d";

const ChatListGenerator = ({ o }: { o: MessageOwner }) => {
    const message = o.messages[o.messages.length - 1]
    return <>
        <ChatList message={message} title={o.title} route='/user/message/chat' />
    </>
}

function Message() {
    const { data, state } = useSelector((store: RootState) => store.accountSlice.message.conversations)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        dispatch(loadUserConversations())
    }, [dispatch])
    return <UserDashboardLayout>
        {
            () => <React.Fragment>
                <Card className="flex justify-between items-center shadow-md rounded-md p-2 lg:p-4 my-2">
                    <div className="text lg:text-lg">
                        Messages
                    </div>
                    <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Add />}
                        onClick={() => router.push('/user/message/new')}
                    >
                        Message
                    </Button>
                </Card>
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
    </UserDashboardLayout>
}

export default Message;
