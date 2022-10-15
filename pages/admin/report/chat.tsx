import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { ChatHeader, MessageComponent, TypeBox } from "../../../components/ChatComponents"
import Loader from "../../../components/Loader"
import { Api } from "../../../helpers/api"
import { loadAdminReports } from "../../../actions/admin/admin"
import { RootState, useAppDispatch } from "../../../store"
import { Message, MessageOwner, MessageType } from "../../../Typing.d"
import { markMessageAsRead } from "actions/message"

const Page = () => {
    const { data, state } = useSelector((store: RootState) => store.messageSlice)
    const { user } = useSelector((store: RootState) => store.authSlice)
    const [conversation, setConversation] = React.useState<MessageOwner>()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const chatBox = React.useRef<HTMLDivElement>()

    React.useEffect(() => {
        if (!router.isReady) return
        if (state === 'nil') {
            dispatch(loadAdminReports())
            return
        }
        const c = data.find(o => o.id.toString() === router.query.id)
        console.log(c)
        if (c !== undefined) setConversation(c)
    }, [data, router])

    const send = async (message: string, type: MessageType = 'text'): Promise<boolean> => {
        try {
            const { status } = await Api().post('/admin/messages/create', JSON.stringify({
                content: message,
                id: conversation.id,
                type: type,
                is_dispute: true,
            } as Message))
        } catch (error) {
            console.log(error)
            return false
        }
        setConversation({
            ...conversation, messages: conversation.messages.concat({
                content: type == 'text' ? message : 'storage/chat/' + message,
                created_at: new Date(),
                type: type,
                owner_id: conversation.id,
                owner_type: "reports",
                sender: user,
                receiver: conversation.messages[0].sender.id === user.id ? conversation.messages[0].receiver : conversation.messages[0].sender,
            })
        })
        return true
    }

    React.useEffect(() => {
        if (chatBox.current == undefined) return
        chatBox.current.scrollTop = chatBox.current.scrollHeight
    }, [conversation])

    useEffect(() => {
        markMessageAsRead({
            owner: conversation?.messages[0].owner_type,
            id: conversation?.id
        })
    }, [conversation])

    return <AdminDashboardLayout className="md:p-1">
        {({ user }) => <>
            {conversation !== undefined && <div>
                <div className="pr-6" style={{
                    backgroundColor: '#202934'
                }}>
                    <ChatHeader title={conversation.title} message={conversation.messages[0]} />
                </div>
                <div className="flex flex-col justify-between h-[65vh] md:h-[60vh] lg:h-[60vh] 2xl:h-[68vh] bg-gray-100">
                    <div className="h-[80%] overflow-y-scroll" ref={chatBox}>
                        {conversation.messages.map((m, i) =>
                            <div key={i}>
                                <MessageComponent message={m} />
                            </div>
                        )}
                    </div>
                    <div className="relative lg:flex justify-center my-1">
                        <div className="bottom-0 md:bottom-14 lg:max-w-[50vw] w-full px-2" style={{ zIndex: 99999 }}>
                            <TypeBox onSend={send} hideFilePicker={false} />
                        </div>
                    </div>
                </div>
            </div>}
            {(state === 'success' || state === 'failed') && conversation === undefined &&
                <div className="p-12 flex flex-col justify-center items-center">
                    CHAT NOT FOUND
                </div>}
            {state === 'pending' && <Loader />}
        </>}
    </AdminDashboardLayout>
}

export default Page