import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { ChatHeader, MessageComponent, TypeBox } from "../../../components/ChatComponents"
import Loader from "../../../components/Loader"
import { UserDashboardLayout } from "../../../components/user/UserDashboardLayout"
import { Api } from "../../../helpers/api"
import { loadUserConversations } from "../../../actions/user/message"
import { RootState, useAppDispatch } from "../../../store"
import { MessageForm, MessageOwner, MessageType } from "../../../Typing.d"

const Page = () => {
    const { data, state } = useSelector((store: RootState) => store.accountSlice.message.reports)
    const { user } = useSelector((store: RootState) => store.authSlice)
    const [conversation, setConversation] = React.useState<MessageOwner>()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const chatBox = React.useRef<HTMLDivElement>()

    React.useEffect(() => {
        if (!router.isReady) return
        if (state === 'nil') {
            dispatch(loadUserConversations())
            return
        }
        const c = data.find(o => o.id.toString() === router.query.id)
        console.log(c)
        if (c !== undefined) setConversation(c)
    }, [data, router])

    const send = async (message: string, type: MessageType = 'text'): Promise<boolean> => {
        try {
            const payload: MessageForm = {
                content: message,
                id: conversation.id,
                type: type,
                is_report: true
            }
            const { status } = await Api().post('/user/messages/create', JSON.stringify(payload))
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

    return <UserDashboardLayout className="md:p-1">
        {() => <>
            {conversation !== undefined && <div>
                <ChatHeader title={conversation.title} message={conversation.messages[0]} />
                <div className="flex flex-col justify-between h-[65vh] md:h-[60vh] lg:h-[60vh] 2xl:h-[68vh] bg-main">
                    <div className="h-[80%] overflow-y-scroll" ref={chatBox}>
                        {conversation.messages.map((m, i) =>
                            <div key={i}>
                                <MessageComponent message={m} />
                            </div>
                        )}
                    </div>
                    <div className="relative lg:flex justify-center my-1">
                        <div className="bottom-0 md:bottom-14 lg:max-w-[50vw] w-full px-2" style={{ zIndex: 100 }}>
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
    </UserDashboardLayout>
}

export default Page