import { PageRoot } from "../_page"
import { BlacReact } from 'blac'
import { User } from "../../Typing"
import { Api } from "../../helpers/api"

export class SubAdminPageState extends PageRoot<User[]> {
    load = async () => {
        this.busy()
        try {
            const { data, status } = await Api().get<User[]>('/admin/sub-admins')
            this.emit({
                ...this.state, data: data
            })
        } catch (error) {

        }
    }
    delete = async () => { }
}

export const { useBloc } = new BlacReact([new SubAdminPageState({
    loading: false,
    data: []
})])
