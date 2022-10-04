import { Button, Slider, TextField } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { money } from "../helpers/helpers"
import { searchProperty, searchServices } from "../actions/property"
import { useAppDispatch } from "../store"
import { PaymentPlans, PropertyType } from "./Resource"

const max = 1000000
const calValue = (number): number => {
    return (number / 100) * max
}
const revertCalc = (number): number => {
    if (number === 0 || number === 100) return number
    return (number * 100) / max
}
export const Search = () => {
    const router = useRouter()
    const [minMax, setMinMax] = React.useState([0, 100])
    const [form, setForm] = React.useState({
        search: '',
        type: '',
        plan: ''
    })

    return <div className='my-2 p-2'>
        <div className='font-medium uppercase'>
            <span className='text-red-500'>F</span>{'ind'}
            {"  "}
            <span className='text-red-500'>P</span>{'roperty'}
        </div>
        <hr className='w-32 my-1' />
        <hr className='w-24 my-1' />
        <hr className='w-20 my-1' />
        <div className='w-full'>
            <form action="">
                <div className="">
                    <div className="md:flex">
                        <div className="my-1 lg:mx-2">
                            <TextField
                                label='Keyword'
                                variant="outlined"
                                size="small"
                                className="w-full md:w-4/5 lg:w-44 text-sm"
                                placeholder="Search"
                                value={form.search}
                                type='search'
                                onChange={(e) => setForm({
                                    ...form, search: e.target.value as string
                                })}
                            />
                        </div>
                        <div className="my-2">
                            <PropertyType
                                value={form.type}
                                handleChange={(s) => setForm({ ...form, type: s })}
                                className={'w-full md:w-44 md:mx-2'} />
                        </div>
                        <div className="my-2">
                            <PaymentPlans
                                value={form.plan}
                                handleChange={(s) => setForm({ ...form, plan: s })}
                                className={'w-full md:w-44 md:mx-2'} />
                        </div>
                    </div>
                    <div className="my-2 w-full px-4">
                        <div className="flex justify-end">
                            <div className="text-xs mx-2">
                                {money(calValue(minMax[0]))}
                            </div>
                            <span className="text-red-500 text-xs  mx-2" >TO</span>
                            <div className="text-xs  mx-2">
                                {money(calValue(minMax[1]))}
                            </div>
                        </div>
                        <Slider
                            size="small"
                            max={100}
                            value={minMax}
                            getAriaLabel={() => "Range"}
                            valueLabelDisplay="off"
                            onChange={(_, v) => setMinMax(v as number[])}
                        />
                    </div>
                    <div className="flex justify-end">
                        <div className="flex flex-col justify-center">
                            <Button
                                onClick={() => router.push(`/properties?search=${form.search}&type=${form.type}&plan=${form.plan}&min=${minMax[0] === 0 ? '' : calValue(minMax[0])}&max=${minMax[1] === 100 ? '' : calValue(minMax[1])}`)}
                                variant='outlined'
                            >
                                search
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export const SearchProperties = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [minMax, setMinMax] = React.useState([0, 100])
    const [form, setForm] = React.useState({
        search: '',
        type: '',
        plan: ''
    })

    React.useEffect(() => {
        const q = router.query
        setForm({
            search: q.search as string || '',
            type: q.type as string || '',
            plan: q.plan as string || ''
        })
        let mM = [q.min as string !== '' && q.min as string !== undefined ? parseInt(q.min as string) : 0, q.max as string !== '' && q.max as string !== undefined ? parseInt(q.max as string) : 100]
        if (isNaN(mM[0])) {
            mM[0] = 0
        }
        if (isNaN(mM[1])) {
            mM[1] = max
        }
        setMinMax([revertCalc(mM[0]), revertCalc(mM[1])])
        const qs = `search=${q.search as string || ''}&type=${q.type as string || ''}&plan=${q.plan as string || ''}&min=${q.min as string || ''}&max=${q.max as string || ''}`
        dispatch(searchProperty(qs))
    }, [router.asPath, router.query])

    const search = () => {
        const q = form
        const qs = `search=${q.search as string || ''}&type=${q.type as string || ''}&plan=${q.plan as string || ''}&min=${minMax[0] === 0 ? '' : calValue(minMax[0])}&max=${minMax[1] === 100 ? '' : calValue(minMax[1])}`
        dispatch(searchProperty(qs))
    }

    return <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="lg:flex justify-center">
            <div className="md:flex">
                <div className="flex justify-around">
                    <PropertyType
                        handleChange={(s) => setForm({ ...form, type: s })}
                        value={form.type}
                        className={'w-32 sm:w-40 mr-2 py-1'} />
                    <PaymentPlans
                        handleChange={(s) => setForm({ ...form, plan: s })}
                        value={form.plan}
                        className={'w-32 sm:w-40 ml-2 py-1'} />
                </div>
                <div className="lg:mx-2 text-xs">
                    <TextField
                        label='Search'
                        variant="outlined"
                        size="small"
                        type='search'
                        value={form.search}
                        onChange={(e) => setForm({ ...form, search: e.target.value })}
                        className="w-full md:w-4/5 lg:w-44"
                        placeholder="Search" />
                </div>
            </div>
            <div className="px-4 lg:w-[30vw]">
                <div className="flex justify-end">
                    <div className="text-xs mx-2">
                        {money(calValue(minMax[0]))}
                    </div>
                    <span className="text-red-500 text-xs  mx-2" >TO</span>
                    <div className="text-xs  mx-2">
                        {money(calValue(minMax[1]))}
                    </div>
                </div>
                <Slider
                    size="small"
                    max={100}
                    value={minMax}
                    getAriaLabel={() => "Range"}
                    valueLabelDisplay="off"
                    onChange={(_, v) => setMinMax(v as number[])}
                />
            </div>
        </div>
        <div className="my-1">
            <Button onClick={search}
                variant='outlined'>
                search
            </Button>
        </div>
    </div>
}
export const SearchServices = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [minMax, setMinMax] = React.useState([0, 100])
    const [form, setForm] = React.useState({
        search: '',
        plan: ''
    })

    React.useEffect(() => {
        const q = router.query
        setForm({
            search: q.search as string || '',
            plan: q.plan as string || ''
        })
        const qs = `search=${q.search as string || ''}&plan=${q.plan as string || ''}&min=${minMax[0] === 0 ? '' : calValue(minMax[0])}&max=${minMax[1] === 100 ? '' : calValue(minMax[1])}`
        dispatch(searchServices(qs))
    }, [])

    const search = () => {
        const q = form
        const qs = `search=${q.search as string || ''}&plan=${q.plan as string || ''}&min=${minMax[0] === 0 ? '' : calValue(minMax[0])}&max=${minMax[1] === 100 ? '' : calValue(minMax[1])}`
        dispatch(searchServices(qs))
    }


    return <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="lg:flex justify-center">
            <div className="flex">
                <PaymentPlans
                    handleChange={(s) => setForm({ ...form, plan: s })}
                    value={form.plan}
                    className={'w-32 sm:w-40 mr-2 py-1'} />
                <div className="lg:mx-2 text-xs">
                    <TextField
                        label='Search'
                        variant="outlined"
                        type='search'
                        size="small"
                        value={form.search}
                        onChange={(e) => setForm({ ...form, search: e.target.value })}
                        className="w-36"
                        placeholder="Search" />
                </div>
            </div>
            <div className="px-4 lg:w-[30vw]">
                <div className="flex justify-end">
                    <div className="text-xs mx-2">
                        {money(calValue(minMax[0]))}
                    </div>
                    <span className="text-red-500 text-xs  mx-2" >TO</span>
                    <div className="text-xs  mx-2">
                        {money(calValue(minMax[1]))}
                    </div>
                </div>
                <Slider
                    size="small"
                    max={100}
                    value={minMax}
                    getAriaLabel={() => "Range"}
                    valueLabelDisplay="off"
                    onChange={(_, v) => setMinMax(v as number[])}
                />
            </div>
        </div>
        <div className="my-1">
            <Button onClick={search}
                variant='outlined'>
                search
            </Button>
        </div>
    </div>
}
