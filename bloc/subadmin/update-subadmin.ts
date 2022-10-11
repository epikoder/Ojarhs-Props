import { PageRoot, PageState } from "../_page"
import { BlacReact } from 'blac'
import { ApiResponse, User } from "../../Typing"
import { getUserToken } from "../../helpers/auth"
import { BASEURL } from "../../config"
import { Api } from "../../helpers/api"

type State = ApiResponse<User, Partial<User>> & { form: Partial<User> }
export class UpdateSubAdminPageState extends PageRoot<State> {
    load = async (id: string) => {
        this.busy()
        try {
            const { data, status } = await Api().get<User[]>('/admin/sub-admins?id=' + id)
            console.log(id, status)

            let u: User = undefined
            if (data.length > 0) {
                u = data[0]
            }
            const state: PageState<State> = {
                ...this.state,
                data: {
                    ...this.state.data, data: u, status: u !== undefined ? 'success' : 'failed',
                    message: u !== undefined ? undefined : 'Failed to load sub-admin',
                    form: u || initialState.data.form
                }
            }
            this.emit(state)
        } catch (error) {
            console.log(error)
        }
        this.idle()
    }
    setForm = (field: string, value: string) => {
        const state = { ...this.state, data: { ...this.state.data, form: { ...this.state.data.form, [field]: value } } }
        if ((field === 'email' || field === 'phone') && state.data.error !== undefined) {
            state.data.error.email = undefined
            state.data.error.phone = undefined
        }
        this.emit(state)
    }
    update = async (callback: VoidFunction): Promise<void> => {
        this.busy()
        try {
            const res = await fetch(BASEURL + '/admin/sub-admins', {
                method: 'PUT',
                body: JSON.stringify(this.state.data.form),
                headers: {
                    authorization: ((): string => {
                        const t = getUserToken()
                        if (t === undefined || t == null) return ""
                        return `Bearer ${t.access}`
                    })()
                }
            })
            switch (res.status) {
                case 400:
                    {
                        const state = {
                            ...this.state,
                            data: {
                                ...this.state.data,
                                ...(await res.json()) as ApiResponse<User, Partial<User>>,
                                message: 'Form validation failed'
                            }
                        }
                        this.emit(state)
                        break
                    }
                case 200: {
                    const _data: ApiResponse = await res.json()
                    const state = {
                        ...this.state,
                        data: {
                            ...this.state.data,
                            ..._data,
                            message: _data.status === 'success' ? 'Updated Successfully' : _data.message,
                        },
                    }
                    this.emit(state)
                    callback()
                    break
                }
                default: {
                    const state = {
                        ...this.state,
                        data: {
                            ...this.state.data,
                            message: 'Error Occured'
                        }
                    }
                    this.emit(state)
                    break
                }
            }
        } catch (_err) {
            console.log(_err)
        }
        this.idle()
    }
    clear = () => {
        this.emit(initialState)
    }
}

const initialState = {
    loading: false,
    data: {
        form: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            photo: ''
        }
    } as State
}

export const { useBloc } = new BlacReact([new UpdateSubAdminPageState(initialState)])
