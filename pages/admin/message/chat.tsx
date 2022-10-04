import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { ChatHeader, MessageComponent, TypeBox } from "../../../components/ChatComponents"
import Loader from "../../../components/Loader"
import { Api } from "../../../helpers/api"
import { loadAdminConverstion } from "../../../actions/admin/admin"
import { RootState, useAppDispatch } from "../../../store"
import { Message, MessageForm, MessageOwner, MessageType } from "../../../Typing.d"

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
            dispatch(loadAdminConverstion())
            return
        }
        const c = data.find(o => o.id.toString() === router.query.id)
        console.log(c)
        if (c !== undefined) setConversation(c)
    }, [data, router])

    // TODO: LIVE MESSAGE

    const send = async (message: string, type: MessageType = 'text'): Promise<boolean> => {
        const receiver = conversation.messages[0].sender.id === user.id ? conversation.messages[0].receiver : conversation.messages[0].sender
        try {
            const { status } = await Api().post('/admin/messages/create', JSON.stringify({
                content: message,
                id: conversation.id,
                type: type,
                receiver: receiver.id,
            } as MessageForm))
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
                owner_type: "conversations",
                sender: user,
                receiver: receiver,
            })
        })
        return true
    }

    React.useEffect(() => {
        if (chatBox.current == undefined) return
        chatBox.current.scrollTop = chatBox.current.scrollHeight
    }, [conversation])

    return <AdminDashboardLayout style={{
        padding: '0px'
    }}>
        {({ user }) => <>
            {conversation !== undefined && <div>
                <ChatHeader title={conversation.title} message={conversation.messages[0]} />
                <div className="flex flex-col justify-between h-[75vh] md:h-[70vh] lg:h-[75vh] bg-main">
                    <div className="h-[80%] overflow-y-scroll" ref={chatBox}>
                        {conversation.messages.map((m, i) =>
                            <div key={i}>
                                <MessageComponent message={m} />
                            </div>
                        )}
                    </div>
                    <div className="relative lg:flex justify-center">
                        <div className="bottom-0 md:bottom-14 lg:max-w-[50vw] w-full px-2" style={{ zIndex: 99999 }}>
                            <TypeBox onSend={send} />
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