import React, { useContext } from 'react'
import {useRouter} from "next/router";
import { Store } from '../utils/Store';



const Shipping = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo} = state;
    const { redirect } = router.query;
    
    
    if(!userInfo){
      router.push(`/login?redirect=/shipping`);
    }
    
    console.log(redirect)

    return (
    <div>Shipping</div>
  )
}

export default Shipping