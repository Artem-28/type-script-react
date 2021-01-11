import React from 'react'
import {Switch, Route} from 'react-router-dom'
import AddManagerPage from '../pages/AddManagerPage/AddManagerPage'
import ListDevisionsPage from '../pages/ListDevisionPage/ListDevisionsPage'
import ListManagersPage from '../pages/ListManagersPage/ListManagersPage'


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component = {ListManagersPage} path='/' exact />
            <Route component = {AddManagerPage} path='/add-manager' exact />
            <Route component = {ListDevisionsPage} path='/subdivision' exact />
        </Switch>
    )
}

export default Routes