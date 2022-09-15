import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { Api } from "../../helpers/api"
import { ApiResponse, QueryParam, Tenant } from "../../Typing.d"

export const loadAllTenants = createAsyncThunk<Tenant[],
    {
        banned?: boolean
    } & Partial<QueryParam>>
    ("tenants/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse<Tenant[]>>(`/admin/tenants/all?chunck=${payload.chunck || ''}&offset=${payload.offset || ''}&search=${payload.search || ''}&banned=${payload.banned || ''}`)
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
                        error: data.error as unknown as Tenant
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })
