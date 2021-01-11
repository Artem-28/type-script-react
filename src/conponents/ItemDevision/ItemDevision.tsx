import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import { MyDevision } from '../../entities/MyDevision';
import TextField from '@material-ui/core/TextField';
import { MyControlDate, MyControlText } from '../../entities/MyControls';
import { validateControl } from '../../validateFormControls/validateControl';
import { formValidateControl } from '../../validateFormControls/validateForm';
import { valueControlType } from '../../interfaces/formControl';
import { IControlsDevision } from '../AddDevision/AddDevision';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './ItemDevision.css'
import { IDevision } from '../../interfaces/devision';
import { capitalizeFirstLetter } from '../../appFunctions/capitalize';

interface IItemDevisionProps {
    devision: MyDevision
    id: false | number
    deleteDevision: () => void
    saveDevision: (devision: IDevision) => void
}

const ItemDevision: React.FC<IItemDevisionProps> = ({ devision, id, deleteDevision, saveDevision }) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlsDevision>({
        name: new MyControlText({ required: true }, devision.name),
        date: new MyControlDate({ required: false }, new Date(devision.date))
    })
    
    function changeHandler<T extends keyof typeof controls>(value: valueControlType, controlName: T): void {
        const newControls = controls
        const control = newControls[controlName]
        control.value = value
        control.touched = true
        control.valid = validateControl(control)
        const formValid = formValidateControl(controls)
        setControls({ ...newControls })
        setIsFormValid(formValid)
    }

    function changeDevision() {
        const upDevision = new MyDevision(controls.name.value, controls.date.value || devision.date)
        upDevision.setId = devision.id
        saveDevision(upDevision)
        setIsFormValid(false) 
    }

    if (id === devision.id) {
        return (
            <>
                <TableCell align="center">{devision.id}</TableCell>
                <TableCell align="center">
                    <TextField
                        id="standard-basic"
                        className='ItemDevision__input'
                        value={controls.name.value}
                        onChange={e => changeHandler(e.target.value, 'name')}
                        error={!controls.name.valid && controls.name.touched}
                        helperText={!controls.name.valid && controls.name.touched
                            ? controls.name.errorMessage
                            : null}
                    />
                </TableCell>
                <TableCell align="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            format="dd/MM/yyyy HH:mm:ss"
                            label={controls.date.label}
                            className='ItemDevision__input'
                            value={controls.date.value}
                            onChange={value => changeHandler(value, 'date')}
                        />
                    </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell align="left" >
                    <div className = 'ItemDevision__buttonWrapper'>
                        <div className = 'ItemDevision__buttonWrapper__button'>
                            <IconButton 
                                color="inherit"
                                disabled = {!isFormValid}
                                onClick = {changeDevision}
                            >
                                <SaveIcon />
                            </IconButton>
                            <IconButton 
                                color="secondary"
                                onClick = {() => deleteDevision()}
                            >
                                <DeleteIcon />   
                            </IconButton>
                        </div>
                    </div>
                </TableCell>
            </>
        )
    }
    return (
        <>
            <TableCell align="center">{devision.id}</TableCell>
            <TableCell id={`name-${devision.id}`} align="center">{capitalizeFirstLetter(devision.name)}</TableCell>
            <TableCell id={`date-${devision.id}`} align="center">{devision.formatDate}</TableCell>
            <TableCell align="center" />
        </>
    )
}

export default ItemDevision