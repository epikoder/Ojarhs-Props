import { ArrowBack, AttachFile, Dangerous, FastForward, Image as ImageIcon, Send } from "@mui/icons-material"
import { Avatar, Card, CircularProgress, Dialog, DialogContent, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import React, { ChangeEvent } from "react"
import { useSelector } from "react-redux"
import { BASEURL, disputeLevel } from "../config"
import { resolveFilePath } from "../helpers/helpers"
import { RootState } from "../store"
import { DisputeLevel, Message, MessageType } from "../Typing.d"

export const ChatHeader = ({ message, title }: { message: Message, title: string }) => {
    const router = useRouter()
    const { user } = useSelector((store: RootState) => store.authSlice)
    return <>
        {user !== undefined && message !== undefined &&
            <Card className="flex justify-between items-center p-1 px-2 w-full">
                <div>
                    <IconButton onClick={() => router.back()}>
                        <ArrowBack className="text-white" fontSize="small" />
                    </IconButton>
                </div>
                <div className="max-w-[40%] text-gray-100 two-lines ellipse">
                    {title}
                </div>
                <Avatar src={resolveFilePath((message.sender.id === user.id ? message.receiver : message.sender).photo)} />
            </Card>
        }
    </>
}

const DisputeLevel = ({ level }: {
    level: {
        name: string
        value: DisputeLevel
    }
}) => {
    return <>
        <div className={`${level.value === 2 ? 'border-red-500 text-red-500' : level.value == 1 ? 'border-yellow-500 text-yellow-500' : 'border-white text-white'} rounded-full px-3 py-px text-sm border`}>
            <span>
                {level.name.toLowerCase()}
            </span>
        </div>
    </>
}

export const ChatList = ({ message, title, route, dispute_level }: { message: Message, title: string, route: string, dispute_level?: DisputeLevel }) => {
    const router = useRouter()
    const { user } = useSelector((store: RootState) => store.authSlice)
    return <>
        {user !== undefined && message !== undefined &&
            <Card elevation={2} className="flex justify-between rounded-lg p-1 px-2 cursor-pointer"
                onClick={() => { router.push(route + '?id=' + message.owner_id + '&type=' + message.owner_type) }}
            >
                <div className="flex space-x-3 max-w-[70%]">
                    <Avatar
                        src={resolveFilePath((message.sender.id === user.id ? message.receiver : message.sender).photo)}
                    />
                    <div className="flex flex-col justify-around max-w-[100%]">
                        <div className="text-gray-200 flex items-center space-x-2">
                            <span className="ellipse whitespace-nowrap">
                                {(message.sender.id === user.id ? message.receiver : message.sender).lname} {(message.sender.id === user.id ? message.receiver : message.sender).fname}
                            </span>
                            {
                                message.is_dispute && dispute_level !== undefined &&
                                <DisputeLevel
                                    level={disputeLevel.find((d) => d.value === dispute_level, {
                                        name: "normal",
                                        value: 0 as DisputeLevel
                                    })}
                                />
                            }
                        </div>
                        <div className="text-sm text-gray-300 whitespace-nowrap flex flex-row">
                            <div className="flex space-x-1 ellipse">
                                <span className="text-sm uppercase">{title} - </span>
                                <span>
                                    {message.type === 'text'
                                        ?
                                        message.content :
                                        (<ImageIcon fontSize='small' />)
                                    }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-400">
                    {(new Date(message.created_at)).toLocaleDateString()}
                </div>
            </Card>
        }
    </>
}

export const MessageComponent = ({ message }: { message: Message }) => {
    const { user } = useSelector((store: RootState) => store.authSlice)
    const receiver = message.sender.id !== user.id ? message.sender : message.receiver
    const isSender = message.sender.id === user.id
    const at = new Date(message.created_at)
    const hour = at.getHours() > 12 ? at.getHours() % 12 : (at.getHours() === 0 ? 12 : at.getHours())
    const morning = at.getHours() < 12

    const [isOpen, setOpen] = React.useState(false)

    const toggleDialog = () => setOpen(!isOpen)

    return <>
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} m-2 lg:m-4`}>
            <div className="flex items-end space-x-1">
                {!isSender && <Avatar src={resolveFilePath((receiver).photo)}
                />}
                <Card elevation={1} className="max-w-[80vw] lg:max-w-[60vw] px-2 py-1 lg:px-4 text-sm whitespace-pre-line">
                    <div>
                        {message.type === 'text' && message.content}
                        {message.type === 'image' &&
                            <>
                                <Dialog
                                    open={isOpen}
                                    onClose={toggleDialog}
                                >
                                    <DialogContent>
                                        <img onClick={() => setOpen(true)} src={resolveFilePath(message.content)} alt="" className="rounded-md max-h-[100vh] max-w-[100vh] w-full h-full" />
                                    </DialogContent>
                                </Dialog>
                                <img onClick={toggleDialog} src={resolveFilePath(message.content)} alt="" className="max-h-[300px] max-w-[240px] rounded-md cursor-pointer" />
                            </>
                        }
                    </div>
                    <div className="text-right">
                        <i style={{
                            fontSize: 10
                        }}>
                            {hour}:{at.getMinutes()}<span className="text-sec">{morning ? 'am' : 'pm'}</span> {at.toLocaleDateString()}
                        </i>
                    </div>
                </Card>
            </div>
        </div>
    </>
}

export const TypeBox = ({ onSend, hideFilePicker = true }: {
    onSend: (s: string, t?: MessageType) => boolean | Promise<boolean>
    hideFilePicker?: boolean
}) => {
    const [text, setText] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const filePicker = React.useRef<HTMLInputElement>()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        var reader = new FileReader()
        reader.onload = async function (e) {
            try {
                var req = new FormData()
                setLoading(true)
                req.set("photo", await (await fetch(e.target.result as string)).blob())
                const res = await fetch(BASEURL + "/upload", {
                    method: "POST",
                    body: req,
                })
                setLoading(false)
                if (res.status !== 200) {
                    return
                }
                var data = await (res).json() as {
                    status: 'success' | 'failed'
                    photo?: string
                    message?: string
                }
                if (data.status === 'failed') {
                    return
                }
                onSend(data.photo, 'image')
            } catch (error) {
                console.log(error)
            }
        }
        const uploader = filePicker.current;
        if (uploader !== undefined) {
            uploader.click()
        }
        reader.readAsDataURL(uploader.files[0])
        toggleInput()
    }

    // patch web limitation
    const [ready, setReady] = React.useState(true)
    const toggleInput = () => {
        setReady(false)
        const i = setTimeout(() => {
            setReady(true)
        }, 300)
        return () => clearTimeout(i)
    }

    return <>
        <div className="h-full w-full p-1 flex items-end justify-between rounded-3xl"
            style={{
                backgroundColor: '#272424',
                backgroundImage: 'linear - gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            }}>
            <div className="px-4 w-full">
                <textarea
                    value={text}
                    maxLength={2000}
                    onChange={(e) => setText(e.target.value)}
                    className="outline-none w-full h-20 text-sm bg-transparent"
                />
            </div>
            <div className="max-w-fit flex flex-col">
                <IconButton
                    disabled={text.length < 1 || loading}
                    onClick={async (e) => {
                        setLoading(true)
                        const status = await onSend(text)
                        setLoading(false)
                        if (status) {
                            setText('')
                        }
                    }}
                    className='-rotate-12'
                >
                    {loading ? <CircularProgress size='16' /> : <Send className={`${text.length < 1 ? '' : 'text-blue-500'}`} />}
                </IconButton>
                {
                    !hideFilePicker && <IconButton
                        disabled={loading}
                        onClick={async () => {
                            if (loading) return
                            const uploader = filePicker.current;
                            console.log(uploader)
                            if (uploader !== undefined) {
                                uploader.click()
                            }
                        }}
                    >
                        {loading ? <CircularProgress size='16' /> : <AttachFile className={`${'text-blue-500'}`} />}
                    </IconButton>
                }
                {ready && <input type={'file'} ref={filePicker} className='hidden' onChange={onChange} accept='image/*' />}
            </div>
        </div>
    </>
}