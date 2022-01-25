import React, { useEffect, useState } from 'react'

import { Route, Switch } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import Dashboard from '../pages/Dashboard'
import Order from '../pages/Order'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import CreateProduct from '../pages/CreateProduct'
import { OrderProvider } from '../contexts/order';
import { ProductProvider } from '../contexts/product';
import { useAuth } from '../contexts/auth';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
const Routes = () => {
    let history = useHistory();
    let context = useAuth();
    let [authenticated,setAuthenticated]= useState(context.authenticated);
    const location = useLocation();
    // useEffect(() => {
    //    if(location.pathname != '/login'){
    //     setAuthenticated(context.authenticated);
    //     if(authenticated===false) history.push('/login');
    //    }
    // })
    return (
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/orders' component={Order} />
                    <Route path='/products' component={Product} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/create-product' component={CreateProduct} />
                </Switch>
    )
}

export default Routes
