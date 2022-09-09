import { FormControl, Input, InputLabel, Slider, TextField } from "@mui/material"
import Link from "next/link"
import React from "react"
import { money } from "../helpers/helpers"
import { PaymentPlans, PropertyType } from "./Resource"

const max = 1000000
const calValue = (number): number => {
    return (number / 100) * max
}
export const Search = () => {
    const [minMax, setMinMax] = React.useState([0, 100])
    const [form, setForm] = React.useState({
        search: '',
        type: '',
        plan: ''
    })

    console.log([calValue(minMax[0]), calValue(minMax[1])])
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
                                placeholder="Search" />
                        </div>
                        <div className="my-2">
                            <PropertyType handleChange={() => { }} className={'w-full md:w-44 md:mx-2'} />
                        </div>
                        <div className="my-2">
                            <PaymentPlans handleChange={() => { }} className={'w-full md:w-44 md:mx-2'} />
                        </div>
                    </div>
                    <div className="my-2 w-full px-4">
                        <div className="flex justify-end">
                            <div className="text-gray-500 text-xs mx-2">
                                {money(calValue(minMax[0]))}
                            </div>
                            <span className="text-red-500 text-xs  mx-2" >TO</span>
                            <div className="text-gray-500 text-xs  mx-2">
                                {money(calValue(minMax[1]))}
                            </div>
                        </div>
                        <Slider
                            size="small"
                            max={100}
                            defaultValue={[calValue(minMax[0]), calValue(minMax[1])]}
                            getAriaLabel={() => "Range"}
                            valueLabelDisplay="off"
                            onChange={(_, v) => setMinMax(v as number[])}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Link href={`/properties?search=${form.search}&type=${form.type}&plan=${form.plan}&min=${calValue(minMax[0])}&max=${calValue(minMax[1])}`}>
                            <div className="flex flex-col justify-center">
                                <div className="text-white uppercase bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 px-2 py-1 duration-300 transition-all ease-in-out cursor-pointer">
                                    search
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}