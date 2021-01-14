import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import {MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import './AddManagerPage.css'
import { MyControlDate, MyControlText, MyControlSelectDevision } from '../../entities/MyControls';
import { AppState } from '../../store/redusers/rootReduser';
import { validateControl } from '../../validateFormControls/validateControl';
import { formValidateControl } from '../../validateFormControls/validateForm';
import { valueControlType } from '../../interfaces/formControl';
import SelectDevisions from '../../conponents/SelectDevisions/SelectDevisions';
import { MyManager } from '../../entities/MyManager';
import { addedManager } from '../../store/actions/actionListManagers';

export interface IControlsManager {
    name: MyControlText
    lastName: MyControlText
    devision: MyControlSelectDevision
    date: MyControlDate
}

const AddManagerPage: React.FC = () => {
    const loading2 = useSelector((state: AppState) => state.loading)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlsManager>({
        name: new MyControlText({required: true}, '', 'Имя'),
        lastName: new MyControlText({required: true}, '', 'Фамилия'),
        devision: new MyControlSelectDevision(null, 'Выбирите подразделение'),
        date: new MyControlDate({required: false}, new Date(), 'Дата регистрации')
    })
   

    function changeSelectDevision(control: MyControlSelectDevision): void {
        setControls(prev => {
            return { ...prev, devision: control }
        })
        const formValid = formValidateControl(controls)
        setIsFormValid(formValid)
    }

    function changeHandler<T extends keyof typeof controls>(value: valueControlType, controlName: T): void {
        const newControls = controls
        const control = newControls[controlName]
        control.value = value
        control.touched = true
        control.valid = validateControl(control)
        const formValid = formValidateControl(controls)
        setControls({...newControls})
        setIsFormValid(formValid)
    }

    function createNewManager(): void {
        const manager = new MyManager(
            controls.lastName.value,
            controls.name.value,
            (controls.devision.value)!,
            controls.date.value || new Date()
        )
        const clearControls = controls
        controls.lastName.clear()
        controls.name.clear()
        controls.devision.clear()
        controls.date.currentDate()
        addedManager(manager)
        setIsFormValid(false) 
        setControls({...clearControls}) 
    }
   
    return(
        <div className = 'addManager__conteiner'>
            <Paper elevation={7} className='addManager__paper'>
            <div className = 'addManager__loader'>
                {loading2 ? <LinearProgress /> : null }
            </div>
            <h2 className='addManager__header'>Добавление нового менеджера</h2>
            <form className='addManager__formManager'>
                <TextField
                    id='outlined-basic'
                    label={controls.name.label}
                    value={controls.name.value}
                    onChange={e => changeHandler(e.target.value, 'name')}
                    variant="outlined"
                    fullWidth={true}
                    error =  {!controls.name.valid && controls.name.touched}
                    helperText = {!controls.name.valid && controls.name.touched 
                        ? controls.name.errorMessage
                        : null}
                />
                <TextField
                    id='outlined-basic'
                    label={controls.lastName.label}
                    value={controls.lastName.value}
                    onChange={e => changeHandler(e.target.value, 'lastName')}
                    variant="outlined"
                    fullWidth={true}
                    error =  {!controls.lastName.valid && controls.lastName.touched}
                    helperText = {!controls.lastName.valid && controls.lastName.touched 
                        ? controls.lastName.errorMessage
                        : null}
                />
                <SelectDevisions 
                    changeSelectDevision = {changeSelectDevision}
                    control = {controls.devision}
                    variant = 'outlined'
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        format="dd/MM/yyyy HH:mm"
                        label={controls.date.label}
                        inputVariant="outlined"
                        value={controls.date.value}
                        onChange={value  => changeHandler(value, 'date')}
                    />
                </MuiPickersUtilsProvider>
            </form>
            <div className='addManager__buttonWrapper'>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    className = 'addManager__button'
                    disabled={!isFormValid }
                    onClick = {createNewManager}
                >{loading2 ? <CircularProgress size = {20}/> : 'Добавить'}</Button>
            </div>
        </Paper>
    </div>
    )
}


export default AddManagerPage