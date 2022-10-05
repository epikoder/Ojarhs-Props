import { Map, QueryParam } from "./Typing"

export class MapFunc<T = any> {
    constructor(map: Map<T>) {
        this._map = map
    }
    private _map: Map<T>

    public first(): T | null {
        if (Object.keys(this._map).length === 0) {
            return null
        }
        return this._map[Object.keys(this._map)[0]]
    }
}

export class Query {
    constructor(query: QueryParam) {
        this._query = query
    }
    private _query: QueryParam

    public toString(): string {
        let s: string = ""
        Object.keys(this._query).forEach((k, i) => {
            if (i === 0) {
                s += '?'
            } else s += '&'
            s += k + '=' + this._query[k]
        })
        return s
    }
}