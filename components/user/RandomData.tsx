import React from 'react'
import { loadUserServices } from "actions/user/dashboard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { UserServices } from "../../components/user/UserServices"
import CountDownTimer from './Countdown';

function RandomData() {   

    const { state, data } = useSelector((store: RootState) => store.accountSlice.services)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(loadUserServices({}))
    }, [])

    // let state = "success"
    // let data = [{name: "shopA4", created_at: "10/06/2022", duration:8, type:"shop"}, {name: "shopB4", created_at: "10/06/2022", duration:12, type:"church"}, {name: "shop4", created_at: "10/06/2022", duration:80, type:"shop"}, {name: "shopA4", created_at: "10/06/2022", duration:8, type:"house"}, {name: "shopA", created_at: "10/06/2022", duration:18, type:"school"}]

    const [randomData, setRandomData] = React.useState(data[Math.floor(Math.random() * data.length)])    
   
    
  return (
    <div>
        {randomData ? <CountDownTimer data={randomData} /> : ""}
    </div>
  )
}

export default RandomData