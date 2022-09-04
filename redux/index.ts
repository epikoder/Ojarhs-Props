import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../constants";
import { Api } from "../helpers/api";
import { ApiResponse, Service, Space, Testimony } from "../Typing.d";

export type indexData = {
    status: 'failed' | 'success'
    shops: Space[],
    office: Space[],
    warehouse: Space[],
    services: Service[],
    testimonies: Testimony[]
}

export const loadIndex =
    createAsyncThunk<indexData | { status: "failed" }, {}>("index/load", async (payload: {}, { rejectWithValue }) => {
        try {
            const response = await fetch(BASEURL)
            if (response.status !== 200) {
                return {
                    status: 'failed',
                }
            }
            const data = await response.json()
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })

            let shops: Space[] = []
            let office: Space[] = []
            let warehouse: Space[] = []
            data.data.spaces.forEach(space => {
                if (space.type == 'office') office = office.concat(space)
                if (space.type == 'shop') shops = shops.concat(space)
                if (space.type == 'warehouse') warehouse = warehouse.concat(space)
            })
            return {
                status: 'success',
                shops: shops,
                office: office,
                warehouse: warehouse,
                services: data.data.services.map(s => {
                    return { ...s, type: 'service' }
                }),
                testimonies: data.data.reviews
            }
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })