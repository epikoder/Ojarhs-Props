import { Map } from "./Typing"

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