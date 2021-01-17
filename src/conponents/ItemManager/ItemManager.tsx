import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { MyControlDate, MyControlText } from '../../entities/MyControls';
import { validateControl } from '../../validateFormControls/validateControl';
import { formValidateControl } from '../../validateFormControls/validateForm';
import { valueControlType } from '../../interfaces/formControl';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { capitalizeFirstLetter } from '../../appFunctions/capitalize';
import { MyManager } from '../../entities/MyManager';
import {IControlsManager} from '../../pages/AddManagerPage/AddManagerPage'
import { IManager } from '../../interfaces/manager';
import './ItemManager.css'

interface IItemManagerProps {
    manager: MyManager
    id: false | number
    deleteManager: () => void
    saveManager: (devision: IManager) => void
}

const ItemManager: React.FC<IItemManagerProps> = ({ manager, id, deleteManager, saveManager }) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlsManager>({
        name: new MyControlText({required: true}, manager.name),
        lastName: new MyControlText({required: true}, manager.lastName),
        devision: new MyControlText({required: true}, '', 'Выбирите подразделение'),
        date: new MyControlDate({required: false}, manager.date)
    })
    
    function changeHandler<T extends keyof typeof controls>(value: valueControlType, controlName: T): void {
        const newControls = controls
        const control = newControls[controlName]
        control.value = value
        control.touched = true
        validateControl(control)
        const formValid = formValidateControl(controls)
        setControls({ ...newControls })
        setIsFormValid(formValid)
    }

    /* function changeSelectDevision(control: MyControlSelectDevision): void {
        setControls(prev => {
            return { ...prev, devision: control }
        })
        const formValid = formValidateControl(controls)
        setIsFormValid(formValid)
    }
 */
    function changeManager() {
        /* const upManager = new MyManager(
            controls.lastName.value, 
            controls.name.value,
            new MyDevision (controls.devision.value, controls.devision.date)
            controls.date.value || manager.date)
        upManager.setId = manager.id
        saveManager(upManager)
        setIsFormValid(false)  */
    }

    if (id === manager.id) {
        return (
            <>
                <TableCell align="center">{manager.id}</TableCell>
                <TableCell align="center">{manager.uuid}</TableCell>
                <TableCell align="center">
                    <TextField
                        className='ItemDevision__input'
                        value={controls.lastName.value}
                        onChange={e => changeHandler(e.target.value, 'lastName')}
                        error={!controls.lastName.valid && controls.lastName.touched}
                        helperText={!controls.lastName.valid && controls.lastName.touched
                            ? controls.lastName.errorMessage
                            : null}
                    />
                </TableCell>
                <TableCell align="center">
                    <TextField
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
                  {/*   <SelectDevisions 
                        changeSelectDevision = {changeSelectDevision}
                        control = {controls.devision}
                       
                    /> */}
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
                                onClick = {changeManager}
                            >
                                <SaveIcon />
                            </IconButton>
                            <IconButton 
                                color="secondary"
                                onClick = {() => deleteManager()}
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
            <TableCell align="center">{manager.id}</TableCell>
            <TableCell align="center">{manager.uuid}</TableCell>
            <TableCell align="center">{capitalizeFirstLetter(manager.lastName)}</TableCell>
            <TableCell align="center">{capitalizeFirstLetter(manager.name)}</TableCell>
            <TableCell align="center">{capitalizeFirstLetter(manager.devision.name)}</TableCell>
            <TableCell align="center">{manager.formatDate}</TableCell>
            <TableCell align="center" />
        </>
    )
}

export default ItemManager