class ServerStorage implements Storage {
    private store: { [name: string]: any } = {}
    public length: number = 0
    clear(): void {
        this.store = {}
        this.length = 0
    }
    getItem(key: string): string {
        let v = this.store[key]
        if (v === undefined) return null
        return v
    }
    key(index: number): string {
        if (index > this.length) return null
        return Object.keys(this.store)[index]
    }
    removeItem(key: string): void {
        if (this.getItem(key) !== null) this.length--
        delete this.store[key]
    }
    setItem(key: string, value: string): void {
        this.store[key] = value
        this.length++
        return
    }
}

export default ServerStorage