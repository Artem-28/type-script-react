import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { deleteManager, fetchListManagers } from '../../store/actions/actionListManagers';
import { fetchMetadate } from '../../store/actions/actionMetadata';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import { MyManager } from '../../entities/MyManager';
import ItemManager from '../../conponents/ItemManager/ItemManager';
import { IManager } from '../../interfaces/manager';
import './ListManagersPage.css'

interface IEditItemState {
    nameItem: string | null
    idItem: number | false
    keyItem: string | null
}

const ListManagersPage: React.FC = () => {
    const [range, setRange] = useState<IRange>({startKey: null,  limit: 5, currentPage: 1})
    const [editManager, setEditManager] = useState<IEditItemState>({nameItem: null, idItem: false, keyItem: null})
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

    function editHandler(manager: MyManager, index: number) {
        setEditManager(prev => { return {
                ...prev, 
                idItem: manager.id, 
                nameItem: `${manager.lastName} ${manager.name}`, 
                keyItem: listManagers.metadata.keys[index]
        }}) 
    }
   
    function switchPages(event: React.ChangeEvent<unknown>, value: number) {
        setRange(prev => { return { 
            ...prev, 
            currentPage: value,
            startKey: listManagers.metadata.keys[prev.limit*(value - 1)]
        }})
    }
    
    function toggleAlert(): void { setIsOpenAlert(prev => !prev) }
    function confirmAlert(confirm: boolean, ): void {
        toggleAlert()
        if(confirm){ deleteManager(editManager.keyItem, range) }
        setEditManager({nameItem: null, idItem: false, keyItem: null})
    }

    function saveManager(manager: IManager): void {
       /*  updateDivision(devision, editDevision.keyItem, range) */
        setEditManager({nameItem: null, idItem: false, keyItem: null})
    }


    useEffect(() => {
       fetchMetadate('managers')
       fetchListManagers(range)
    }, [range])
    return (
        <>
        <Container className='listManagersPage__container'>
            <div className = 'listManagersPage__header'>
                <h1>Список менеджеров</h1>
            </div>
            <div className = 'listManagersPage__selectWrapper'>
                <span>Показывать по:</span>
                <Select
                    className = 'listManagersPage__selectWrapper__select'
                    value={range.limit}
                    onChange={handleChange}
                    variant = 'outlined'  
                >
                    <MenuItem value={5}  className = 'listManagersPage__selectWrapper__select'>5</MenuItem>
                    <MenuItem value={10} className = 'listManagersPage__selectWrapper__select'>10</MenuItem>
                    <MenuItem value={15} className = 'listManagersPage__selectWrapper__select'>15</MenuItem>
                </Select>
            </div>
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead className='listManagersPage__tableHead' >
                        <TableRow >
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">uuid</TableCell>
                            <TableCell align="center">Фамилия менеджера</TableCell>
                            <TableCell align="center">Имя менеджера</TableCell>
                            <TableCell align="center">Подразделение</TableCell>
                            <TableCell align="center">Дата регистрации</TableCell>
                            <TableCell align="center" />
                        </TableRow>
                    </TableHead>
                    {!loading 
                    ?<TableBody className = 'listManagersPage__tableBody'>
                        {listManagers.managers.map((manager, index) => {
                                return (
                                    <TableRow 
                                        className = 'test'
                                        id = {`${manager.id}`}
                                        hover={true} 
                                        key={manager.id} 
                                        onDoubleClick = {() => editHandler(manager, index)}
                                    >
                                        <ItemManager 
                                             manager = {manager}
                                             deleteManager = {toggleAlert} 
                                             saveManager = {saveManager}
                                             id = {editManager.idItem}
                                        />
                                    </TableRow>
                                ) 
                            })}
                    </TableBody>
                    : null }
                </Table>
            </TableContainer>
            <TableLoading 
                listLength = {listManagers.managers.length} 
                label = 'Не добавлено ни одного менеджера' 
            />
            <div className='listManagersPage__bottomNavbar'>
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
            nameItem = {editManager.nameItem} 
            onClick = {confirmAlert}
        />
    </>
    )
    
}


export default ListManagersPage