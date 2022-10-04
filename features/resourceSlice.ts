import { createSlice } from "@reduxjs/toolkit";
import { loadPlans, loadPropertyTypes } from "../actions/resource";
import { store } from "../store";
import { LoadState } from "../Typing.d";

type resourceState = {
    plans: {
        status: LoadState
        data: { name: string }[]
    },
    propertyTypes: {
        status: LoadState
        data: { name: string }[]
    }
}

const resourceSlice = createSlice({
    name: "resourceslice",
    initialState: {
        plans: {
            status: 'success'
        },
        propertyTypes: {
            status: 'success'
        }
    } as resourceState,
    reducers: {
        fetch: (_, { payload }) => {
            switch (payload) {
                case 'plan':
                    store.dispatch(loadPlans())
                    break
                case 'proptypes':
                    store.dispatch(loadPropertyTypes())
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPlans.pending, (state, { payload }) => {
            state.plans.status = 'pending'
        })
        builder.addCase(loadPlans.fulfilled, (state, { payload }) => {
            state.plans.status = 'success'
            state.plans.data = payload
        })
        builder.addCase(loadPlans.rejected, (state) => {
            state.plans.status = 'failed'
        })

        // property types
        builder.addCase(loadPropertyTypes.pending, (state, { payload }) => {
            state.propertyTypes.status = 'pending'
        })
        builder.addCase(loadPropertyTypes.fulfilled, (state, { payload }) => {
            state.propertyTypes.status = 'success'
            state.propertyTypes.data = payload
        })
        builder.addCase(loadPropertyTypes.rejected, (state) => {
            state.propertyTypes.status = 'failed'
        })
    }
})

export const { fetch } = resourceSlice.actions
export default resourceSlice.reducer