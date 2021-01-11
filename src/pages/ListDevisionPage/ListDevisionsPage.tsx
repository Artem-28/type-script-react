import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import './ListDevisionsPage.css'
import AddDevision from '../../conponents/AddDevision/AddDevision';
import {deleteDevision, fetchListDevisions, updateDivision } from '../../store/actions/actionListDevisions';
import { AppState } from '../../store/redusers/rootReduser';
import TableLoading from '../../conponents/TableLoading/TableLoading';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import { MyDevision } from '../../entities/MyDevision';
import ItemDevision from '../../conponents/ItemDevision/ItemDevision';
import WarningDelete from '../../conponents/WarningDelete/WarningDelete';
import { IDevision } from '../../interfaces/devision';
import { fetchMetadate } from '../../store/actions/actionMetadata';

export interface IRange {
    startKey: string | null
    limit: number
    currentPage: number
}

interface IEditItemState {
    nameItem: string | null
    idItem: number | false
    keyItem: string | null
}

const ListDevisionsPage: React.FC = () => {
    const [isAddDevision, setIsAddDevision] = useState<boolean>(false)
    const [editDevision, setEditDevision] = useState<IEditItemState>({nameItem: null, idItem: false, keyItem: null})
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

    function editHandler(devision: MyDevision, index: number) {
        setEditDevision(prev => { return {
                ...prev, 
                idItem: devision.id, 
                nameItem: devision.name, 
                keyItem: listDevisions.metadata.keys[index]
        }}) 
    }

    function toggleAddDevision(): void { setIsAddDevision(prev => !prev) }
    function toggleAlert(): void { setIsOpenAlert(prev => !prev) }

    function confirmAlert(confirm: boolean, ): void {
        toggleAlert()
        if(confirm){ deleteDevision(editDevision.keyItem, range) }
        setEditDevision({nameItem: null, idItem: false, keyItem: null})
    }

    function saveDevision(devision: IDevision): void {
        updateDivision(devision, editDevision.keyItem, range)
        setEditDevision({nameItem: null, idItem: false, keyItem: null})
    }

    useEffect(() => {
        fetchMetadate('devisions')
        fetchListDevisions(range)
    }, [range])

    return (
        <>
            <Container className='listDevisionPage__container'>
                <div className = 'listDevisionPage__header'>
                    <h1>Список подразделений</h1>
                </div>
                <div className = 'listDevisionPage__selectWrapper'>
                    <span>Показывать по:</span>
                    <Select
                        className = 'listDevisionPage__selectWrapper__select'
                        value={range.limit}
                        onChange={handleChange}
                        variant = 'outlined'  
                    >
                        <MenuItem value={5}  className = 'listDevisionPage__selectWrapper__select'>5</MenuItem>
                        <MenuItem value={10} className = 'listDevisionPage__selectWrapper__select'>10</MenuItem>
                        <MenuItem value={15} className = 'listDevisionPage__selectWrapper__select'>15</MenuItem>
                    </Select>
                </div>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead className='listDevisionPage__tableHead' >
                            <TableRow >
                                <TableCell align="center">id</TableCell>
                                <TableCell align="center">Название подразделения</TableCell>
                                <TableCell align="center">Дата создания</TableCell>
                                <TableCell align="center" />
                            </TableRow>
                        </TableHead>
                        {!loading 
                        ?<TableBody className = 'listDevisionPage__tableBody'>
                            {listDevisions.devisions.map((devision, index) => {
                                    return (
                                        <TableRow 
                                            className = 'test'
                                            id = {`${devision.id}`}
                                            hover={true} 
                                            key={devision.id} 
                                            onDoubleClick = {() => editHandler(devision, index)}
                                        >
                                            <ItemDevision 
                                                devision = {devision}
                                                deleteDevision = {toggleAlert} 
                                                saveDevision = {saveDevision}
                                                id = {editDevision.idItem}
                                            />
                                        </TableRow>
                                    ) 
                                })}
                        </TableBody>
                        : null }
                    </Table>
                </TableContainer>
                <TableLoading 
                    listLength = {listDevisions.devisions.length} 
                    label = 'Не добавлено ни одного подразделения' 
                />
                <div className='listDevisionPage__bottomNavbar'>
                    <Pagination 
                        count={numPages} 
                        color="primary" 
                        onChange = {switchPages}
                        page = {range.currentPage}
                    />
                    <div className = 'listDevisionPage__bottomNavbar__addedButton'>
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
                nameItem = {editDevision.nameItem} 
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