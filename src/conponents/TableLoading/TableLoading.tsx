import React from 'react'
import {useSelector} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppState } from '../../store/redusers/rootReduser';
import './TableLoading.css'

interface ITableLoadingProps {
    listLength: number
    label: string
}

const TableLoading: React.FC<ITableLoadingProps> = ({listLength, label}) => {
    const loading = useSelector((state: AppState) => state.loading)
    return (
        <div className ={
            loading || listLength === 0
            ?'loading'
            :'loading__hidden' 
        }>
            {loading 
            ? <CircularProgress size = {40}/> 
            : <h4 className='loading__header'> {label} </h4>
            }
        </div>
    )
}

export default TableLoading