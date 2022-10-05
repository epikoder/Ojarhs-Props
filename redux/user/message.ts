import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { Api } from "../../helpers/api"
import { parseString } from "../../helpers/helpers"
import { ApiResponse, Message, MessageOwner, MesssageForm, Service } from "../../Typing.d"

export const loadUserConversations = createAsyncThunk<MessageOwner[]>
    ("user-messages/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<MessageOwner[]>>("/user/messages/all")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            var m: MessageOwner[] = []
            data.data.forEach((_m) => {
                if (_m.messages.length > 0) {
                    m = m.concat(_m)
                }
            })
            return m
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const loadUserDispute = createAsyncThunk<MessageOwner[]>
    ("user-disputes/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<MessageOwner[]>>("/user/messages/all?is_dispute=1")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            var m: MessageOwner[] = []
            data.data.forEach((_m) => {
                if (_m.messages.length > 0) {
                    m = m.concat(_m)
                }
            })
            return m
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const loadUserReports = createAsyncThunk<MessageOwner[]>
    ("user-reports/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<MessageOwner[]>>("/user/messages/all?is_report=1")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            var m: MessageOwner[] = []
            data.data.forEach((_m) => {
                if (_m.messages.length > 0) {
                    m = m.concat(_m)
                }
            })
            return m
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const createUserMessage = createAsyncThunk<Message, MesssageForm>
    ("user-messages/create", async (payload, { rejectWithValue }) => {
        try {
            payload.content = parseString(payload.content)
            const { data, status } = await Api().post<ApiResponse<Message>>("/admin/messages/create", JSON.stringify(payload))
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            return data.data
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })