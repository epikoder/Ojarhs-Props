import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Api } from "../../helpers/api";
import { parseString } from "../../helpers/helpers";
import { Query } from "../../Type";
import { Advert, ApiResponse, Expense, Invoice, Message, MessageOwner, MesssageForm, PackoutRequest, QueryParam, Service, Space } from "../../Typing";

export const addNewPropertyThunck = createAsyncThunk<ApiResponse | {
    status: 'failed'
    message?: string
    error?: Space
}, Space>
    ("properties/new", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().post<ApiResponse>("/admin/properties/create", JSON.stringify({ ...payload, amount: parseInt(payload.amount.toString()) }))
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
            return {
                status: data.status,
                message: data.message
            } as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Space
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const addNewServiceThunck = createAsyncThunk<ApiResponse | {
    status: 'failed'
    message?: string
    error?: Space
}, Service>
    ("service/new", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().post<ApiResponse>("/admin/services/create", JSON.stringify({ ...payload, amount: parseInt(payload.amount.toString()) }))
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
            return {
                status: data.status,
                message: data.message
            } as ApiResponse
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

export const loadAdminProperties = createAsyncThunk<ApiResponse<Space[]>>
    ("properties/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/properties/all")
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
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Space
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const deletePropertyAsync = createAsyncThunk<string, string>('admin/property-delete', async (payload, { rejectWithValue }) => {
    try {
        await Api().delete('/admin/properties/delete?slug=' + payload)
        return payload
    } catch (error) {
        return rejectWithValue({})
    }
})


export const loadAdminServices = createAsyncThunk<ApiResponse<Service[]>>
    ("services/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/services/all")
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
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
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

export const deleteServiceAsync = createAsyncThunk<string, string>('admin/service-delete', async (payload, { rejectWithValue }) => {
    try {
        await Api().delete('/admin/services/delete?slug=' + payload)
        return payload
    } catch (error) {
        return rejectWithValue({})
    }
})

export const loadAdminAdverts = createAsyncThunk<ApiResponse<Advert[]>>
    ("adverts/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/adverts/all")
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
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
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

export const loadApplications = createAsyncThunk<ApiResponse<Advert[]>, QueryParam | void>
    ("applications/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/applications/all" + (new Query(payload || {})).toString())
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
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
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

export const loadAdminConverstion = createAsyncThunk<MessageOwner[]>
    ("messages/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<MessageOwner[]>>("/admin/messages/all")
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

export const loadAdminDisputes = createAsyncThunk<MessageOwner[]>
    ("disputes/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<MessageOwner[]>>("/admin/messages/all?is_dispute=1")
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

export const loadAdminReports = createAsyncThunk<MessageOwner[]>
    ("reports/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<MessageOwner[]>>("/admin/messages/all?is_report=1")
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

export const createAdminMessage = createAsyncThunk<Message, MesssageForm>
    ("messages/create", async (payload, { rejectWithValue }) => {
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

export const loadAdminPackoutRequest = createAsyncThunk<PackoutRequest[]>("admin/packout-request", async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await Api().get<ApiResponse<PackoutRequest[]>>('/admin/packout')
        return data
            .data.map(e => ({ ...e, date: (new Date(e.date)).toLocaleDateString() }))
    } catch (error) {
        return rejectWithValue({})
    }

})


export const loadExpenses = createAsyncThunk<Expense[]>("admin/expense-all", async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await Api().get<ApiResponse<Expense[]>>('/admin/expenses/all')
        return data
            .data
    } catch (error) {
        return rejectWithValue({})
    }

})

export const loadInvoices = createAsyncThunk<Invoice[]>("admin/invoice-all", async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await Api().get<ApiResponse<Invoice[]>>('/admin/invoice')
        return data
            .data
    } catch (error) {
        return rejectWithValue({})
    }

}) 