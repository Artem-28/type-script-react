import React from 'react'
import {useSelector} from 'react-redux'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { capitalizeFirstLetter } from '../../appFunctions/capitalize';
import './ItemManager.css'
import { MyManager } from '../../entities/MyManager';
import { AppState } from '../../store/redusers/rootReduser';

 

interface IItemManagersProp {
    managers: MyManager[]
    keys: (string| null)[]
    deleteClick: (key: string | null, title: string) => void
}

const ItemDevisions: React.FC<IItemManagersProp> = ({managers, keys, deleteClick}) => {
    const isLogin = useSelector((state: AppState) => state.currentUserApp.user)
    const clsButton = ['ItemManager__button']
    if (!isLogin) { clsButton.push('ItemManager__button__hidden')}
    return (
        <TableBody>
        {managers.map((manager, index) => {
            return (
                <TableRow
                    className = 'ItemManager__TableRow'
                    id={`${manager.id}`}
                    hover={true}
                    key={manager.id}
                >
                    <TableCell align="center">
                        {manager.id}
                    </TableCell>
                    <TableCell align="center">
                        {manager.uuid}
                    </TableCell>
                    <TableCell align="center">
                        {capitalizeFirstLetter(manager.lastName)}
                    </TableCell>
                    <TableCell align="center">
                        {capitalizeFirstLetter(manager.name)}
                    </TableCell>
                    <TableCell align="center">
                        {manager.devision.name}
                    </TableCell>
                    <TableCell align="center">
                        {manager.formatDate}
                        <IconButton 
                            className = {clsButton.join(' ')} 
                            color="secondary"
                            onClick = {() => deleteClick(keys[index], manager.name)}
                        > 
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })}
    </TableBody>
    )
    
}

export default ItemDevisions