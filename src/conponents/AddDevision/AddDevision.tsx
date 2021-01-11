import React, {useState } from 'react'
import {useSelector} from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import {MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import './AddDevision.css'
import { MyControlDate, MyControlText } from '../../entities/MyControls';
import { valueControlType } from '../../interfaces/formControl';
import { MyDevision } from '../../entities/MyDevision';
import { validateControl } from '../../validateFormControls/validateControl';
import { formValidateControl } from '../../validateFormControls/validateForm';
import { AppState } from '../../store/redusers/rootReduser';
import { addedDevision } from '../../store/actions/actionListDevisions';
import { IRange } from '../../pages/ListDevisionPage/ListDevisionsPage';

interface IAddedDevisionProps {
    isOpen: boolean
    toggleAddDevision: () => void
    range: IRange
}

export interface IControlsDevision  {
    name: MyControlText
    date: MyControlDate
}

const AddDevision: React.FC<IAddedDevisionProps> = ({isOpen, toggleAddDevision, range}) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlsDevision>({
        name: new MyControlText({required: true}, '', 'Название подразделения'),
        date: new MyControlDate({required: false}, new Date(), 'Дата создания подразделения')
    })

    const loading = useSelector((state: AppState) => state.loading)
   
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

    function createNewDevision(): void{
        const devision = new MyDevision(controls.name.value, controls.date.value || new Date())
        const clearControls = controls
        addedDevision(devision, range)
        clearControls.name.clear()
        clearControls.date.currentDate()
        setIsFormValid(false) 
        setControls({...clearControls}) 
    }
    
    return (
        <Backdrop style={{zIndex: 1}} open={isOpen} >
            <Paper className='addDevision__peper'>
                <div className = 'addDevision__loader'>
                    {loading ? <LinearProgress /> : null }
                </div>
                <h2 className='addDevision__header'>Добавление нового подразделения</h2>
                <form className='addDevision__formDevision'>
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
                <div className='addDevision__buttonWrapper'>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        className = 'addDevision__button'
                        disabled = {loading}
                        onClick = {() => toggleAddDevision()}
                    >Отмена</Button>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        className = 'addDevision__button'
                        disabled={!isFormValid}
                        onClick = {createNewDevision}
                    >{loading ? <CircularProgress size = {20}/> : 'Сохранить'}</Button>
                </div>
            </Paper>
        </Backdrop>
    )
}

export default AddDevision