import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { deleteManager, fetchListManagers } from '../../store/actions/actionListManagers';
import { fetchMetadate } from '../../store/actions/actionMetadata';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableLoading from '../../conponents/TableLoading/TableLoading';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import WarningDelete from '../../conponents/WarningDelete/WarningDelete';
import { IRange } from '../ListDevisionPage/ListDevisionsPage';
import { AppState } from '../../store/redusers/rootReduser';
import ItemManager from '../../conponents/ItemManager/ItemManager';


interface IEditItemState {
    title: string | null
    key: string | null
}

const ListManagersPage: React.FC = () => {
    const [range, setRange] = useState<IRange>({startKey: null,  limit: 5, currentPage: 1})
    const [editManager, setEditManager] = useState<IEditItemState>({title: null, key: null})
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false)
    const listManagers = useSelector((state: AppState) => state.listManagers)
    const loading = useSelector((state: AppState) => state.loading)
    const numPages:number = Math.ceil(listManagers.metadata.keys.length/range.limit)
    
    function handleChange (event: React.ChangeEvent<{ value: unknown }>){
        setRange(prev => { return { 
            ...prev, 
            limit: event.target.value as number, 
            startKey: null,
            currentPage: 1
        }})
    }; 

   
    function switchPages(event: React.ChangeEvent<unknown>, value: number) {
        setRange(prev => { return { 
            ...prev, 
            currentPage: value,
            startKey: listManagers.metadata.keys[prev.limit*(value - 1)]
        }})
    }
    
    function confirmAlert(confirm: boolean, ): void {
        setIsOpenAlert(false)
        if(confirm){ deleteManager(editManager.key, range) }
        setEditManager({title: null, key: null})
    }

    function changeItem(key: string | null, title: string) {
        console.log(key)
        setEditManager({title, key})
        setIsOpenAlert(true)
    }

    useEffect(() => {
       fetchMetadate('managers')
       fetchListManagers(range)
    }, [range])
    return (
        <>
        <Container className='listStyle__container'>
            <div className = 'listStyle__header'>
                <h1>Список менеджеров</h1>
            </div>
            <div className = 'selectStyle__selectWrapper'>
                <span>Показывать по:</span>
                <Select
                    className = 'selectStyle__selectWrapper__select'
                    value={range.limit}
                    onChange={handleChange}
                    variant = 'outlined'  
                >
                    <MenuItem value={5}  className = 'selectStyle__selectWrapper__select'>5</MenuItem>
                    <MenuItem value={10} className = 'selectStyle__selectWrapper__select'>10</MenuItem>
                    <MenuItem value={15} className = 'selectStyle__selectWrapper__select'>15</MenuItem>
                </Select>
            </div>
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead className='listStyle__tableHead'>
                        <TableRow className='listStyle__tableRow'>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">uuid</TableCell>
                            <TableCell align="center">Фамилия менеджера</TableCell>
                            <TableCell align="center">Имя менеджера</TableCell>
                            <TableCell align="center">Подразделение</TableCell>
                            <TableCell align="center">Дата регистрации</TableCell>
                        </TableRow>
                    </TableHead>
                    {!loading
                    ? <ItemManager 
                        managers = {listManagers.managers}
                        deleteClick = {changeItem}
                        keys = {listManagers.metadata.currentKeys}
                    />
                    : null}
                </Table>
            </TableContainer>
            <TableLoading 
                listLength = {listManagers.managers.length} 
                label = 'Не добавлено ни одного менеджера' 
            />
            <div className='listStyle__bottomNavbar'>
                <Pagination 
                    count={numPages} 
                    color="primary" 
                    onChange = {switchPages}
                    page = {range.currentPage}
                />
            </div> 
        </Container>
        <WarningDelete 
            isOpen = {isOpenAlert} 
            nameItem = {editManager.title} 
            onClick = {confirmAlert}
        />
    </>
    )
    
}


export default ListManagersPage