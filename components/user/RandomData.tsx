import React, { useState } from 'react'
import { loadUserProperties, loadUserServices } from "actions/user/dashboard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { UserServices } from "../../components/user/UserServices"
import CountDownTimer from './Countdown';

function RandomData() {       
    const dispatch = useAppDispatch()
   
    React.useEffect(() => {
        dispatch(loadUserServices({}))
    }, [])

    React.useEffect(() => {
        dispatch(loadUserProperties({}))
    }, [])

    const [service, setService] = useState(useSelector((store: RootState) => store.accountSlice.services))    
    const [properties, setProperties] = useState(useSelector((store: RootState) => store.accountSlice.properties))


    const totalData = [...service.data, ...properties.data]           
    

    const [randomData, setRandomData] = React.useState(totalData[Math.floor(Math.random() * totalData.length)])    
   
    
  return (
    <div>
        {randomData !== undefined  && <CountDownTimer data={randomData} /> }
    </div>
  )
}

export default RandomData