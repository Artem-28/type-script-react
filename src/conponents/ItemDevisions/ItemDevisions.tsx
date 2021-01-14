import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { capitalizeFirstLetter } from '../../appFunctions/capitalize';
import { MyDevision } from '../../entities/MyDevision';
import './ItemDevisions.css'



interface IItemDevisionsProp {
    devisions: MyDevision[]
    keys: (string| null)[]
    deleteClick: (key: string | null, title: string) => void
}

const ItemDevisions: React.FC<IItemDevisionsProp> = ({devisions, keys, deleteClick}) => {
    let isLogin = true
    const clsButton = ['ItemDevision__button']
    if (!isLogin) { clsButton.push('ItemDevision__button__hidden')}
    return (
        <TableBody>
        {devisions.map((devision, index) => {
            return (
                <TableRow
                    className = 'ItemDevisions__TableRow'
                    id={`${devision.id}`}
                    hover={true}
                    key={devision.id}
                >
                    <TableCell align="center">
                        {devision.id}
                    </TableCell>
                    <TableCell align="center">
                        {capitalizeFirstLetter(devision.name)}
                    </TableCell>
                    <TableCell align="center">
                        {devision.formatDate}
                        <IconButton 
                            className = {clsButton.join(' ')} 
                            color="secondary"
                            onClick = {() => deleteClick(keys[index], devision.name)}
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