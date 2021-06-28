import React from 'react'
import {useQuery} from '@apollo/client';
import {IS_LOGGED_IN} from './graphql/auth'
import {useRoutes} from 'react-router-dom'
import routes from "src/routes";



const NavigationRoute = () => {
    const {data} =useQuery(IS_LOGGED_IN);
  
    const routing = useRoutes(routes(data?.isLoggedIn));
    return <>
       {routing}
    </>
    
}

export default NavigationRoute


