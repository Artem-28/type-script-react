import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import AddDevision from '../../conponents/AddDevision/AddDevision';
import {deleteDevision, fetchListDevisions } from '../../store/actions/actionListDevisions';
import { AppState } from '../../store/redusers/rootReduser';
import TableLoading from '../../conponents/TableLoading/TableLoading';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import WarningDelete from '../../conponents/WarningDelete/WarningDelete';
import { fetchMetadate } from '../../store/actions/actionMetadata';
import ItemDevisions from '../../conponents/ItemDevisions/ItemDevisions';

export interface IRange {
    startKey: string | null
    limit: number
    currentPage: number
}

interface IEditItemState {
    title: string | null
    key: string | null
}

const ListDevisionsPage: React.FC = () => {
    const [isAddDevision, setIsAddDevision] = useState<boolean>(false)
    const [editDevision, setEditDevision] = useState<IEditItemState>({title: null, key: null})
    const [range, setRange] = useState<IRange>({startKey: null,  limit: 5, currentPage: 1})
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false)
    const loading = useSelector((state: AppState) => state.loading)
    const listDevisions = useSelector((state: AppState) => state.listDevisions)
    const numPages:number = Math.ceil(listDevisions.metadata.keys.length/range.limit)

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
            startKey: listDevisions.metadata.keys[prev.limit*(value - 1)]
        }})
    }

    function toggleAddDevision(): void { setIsAddDevision(prev => !prev) }
   
    function confirmAlert(confirm: boolean, ): void {
        setIsOpenAlert(false)
        if(confirm){ deleteDevision(editDevision.key, range) }
        setEditDevision({title: null, key: null})
    }

    function changeItem(key: string | null, title: string) {
        setEditDevision({title, key})
        setIsOpenAlert(true)
    }
   
    useEffect(() => {
        fetchMetadate('devisions')
        fetchListDevisions(range)
    }, [range])

    return (
        <>
            <Container className='listStyle__container'>
                <div className = 'listStyle__header'>
                    <h1>Список подразделений</h1>
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
                                <TableCell align="center">Название подразделения</TableCell>
                                <TableCell align="center">Дата создания</TableCell>
                            </TableRow>
                        </TableHead>
                        {!loading
                        ? <ItemDevisions 
                            devisions = {listDevisions.devisions}
                            deleteClick = {changeItem}
                            keys = {listDevisions.metadata.currentKeys}
                        />
                        : null}
                    </Table>
                </TableContainer>
                <TableLoading 
                    listLength = {listDevisions.devisions.length} 
                    label = 'Не добавлено ни одного подразделения' 
                />
                <div className='listStyle__bottomNavbar'>
                    <Pagination 
                        count={numPages} 
                        color="primary" 
                        onChange = {switchPages}
                        page = {range.currentPage}
                    />
                    <div className = 'listStyle__bottomNavbar__addedButton'>
                        <Button 
                            color='primary' 
                            variant="outlined"
                            onClick = {toggleAddDevision}
                        >Добавить подразделение</Button>
                    </div>
                </div> 
            </Container>
            <WarningDelete 
                isOpen = {isOpenAlert} 
                nameItem = {editDevision.title} 
                onClick = {confirmAlert}
            />
            <AddDevision 
                isOpen = {isAddDevision} 
                toggleAddDevision = {toggleAddDevision} 
                range = {range}
            />
        </>
    )
}


export default ListDevisionsPage