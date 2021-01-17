import React from 'react'
import {Switch, Route} from 'react-router-dom'
import AddManagerPage from '../pages/AddManagerPage/AddManagerPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import ListDevisionsPage from '../pages/ListDevisionPage/ListDevisionsPage'
import ListManagersPage from '../pages/ListManagersPage/ListManagersPage'
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage'


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component = {ListManagersPage} path='/' exact />
            <Route component = {AddManagerPage} path='/add-manager' exact />
            <Route component = {ListDevisionsPage} path='/subdivision' exact />
            <Route component = {AuthPage} path='/auth' exact />
            <Route component = {RegistrationPage} path='/registration' exact />
        </Switch>
    )
}

export default Routes