class List {
    static remove = <T>(arr: Array<T>, index: number): Array<T> => {
        return arr.slice(0, index).concat(arr.slice(index + 1, arr.length))
    }

    static toString = (arr: Array<string>, seperator: string = ','): string => {
        let r = ''
        for (let i = 0; i < arr.length; i++) {
            if (i !== arr.length - 1) {
                r = r.concat(arr[i] + seperator)
            } else {
                r = r.concat(arr[i])
            }
        }
        return r
    }
}
export default List
