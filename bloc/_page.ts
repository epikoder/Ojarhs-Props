import { Cubit } from 'blac'

export type PageState<T> = {
    data: T
    loading: boolean
}

export abstract class PageRoot<T = any> extends Cubit<PageState<T>> {
    idle = (): void => this.emit({ ...this.state, loading: false })
    busy = (): void => this.emit({ ...this.state, loading: true })
}
