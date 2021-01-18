import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyControlText } from '../../entities/MyControls';
import { AppState } from '../../store/redusers/rootReduser';
import { validateControl } from '../../validateFormControls/validateControl';
import { formValidateControl } from '../../validateFormControls/validateForm';
import './RegistrationPage.css'
import { registrationUser } from '../../store/actions/actionAuthUser';



export interface IControlRegistration {
    email: MyControlText
    password: MyControlText
    repeatPassword: MyControlText
}

const RegistrationPage: React.FC = () => {
    const loading = useSelector((state: AppState) => state.loading)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlRegistration>({
        email: new MyControlText(
            {required: true, email: true}, 
            '', 
            'Введите email'),
        password: new MyControlText(
            {required: true, minLength: 6}, 
            '', 
            'Введите пароль'),
        repeatPassword: new MyControlText(
            {required: true, repeat: true}, 
            '', 
            'Повторите пароль'),
    })

   
    function changeHandler<T extends keyof typeof controls>(value: string, controlName: T): void {
        const newControls = controls
        const control = newControls[controlName]
        control.value = value
        control.touched = true
        validateControl(control, controls.password)
        const formValid = formValidateControl(controls) 
        && (controls.password.value === controls.repeatPassword.value)
        setControls({...newControls})
        setIsFormValid(formValid)
    }

    function registrationHandler() {
        registrationUser(controls.email.value, controls.password.value)
        const clearControls = controls
        clearControls.email.clear()
        clearControls.password.clear()
        clearControls.repeatPassword.clear()
        setIsFormValid(false) 
        setControls({...clearControls}) 
    }



    
    return (
        <div className = 'formStyle__conteiner'>
        <Paper elevation={7} className='formStyle__paper RegistrationPage__paper'>
        <div className = 'formStyle__loader'>
            {loading ? <LinearProgress /> : null }
        </div>
        <h2 className='formStyle__header'>Регистрация нового пользователя</h2>
        <form className='formStyle__form RegistrationPage__formManager'>
            <TextField
                className = 'formStyle_control'
                label={controls.email.label}
                value={controls.email.value}
                onChange={e => changeHandler(e.target.value, 'email')}
                variant="outlined"
                fullWidth={true}
                error =  {!controls.email.valid && controls.email.touched}
                helperText = {!controls.email.valid && controls.email.touched 
                    ? controls.email.errorMessage
                    : null}
            />
            <TextField
                className = 'formStyle_control'
                label={controls.password.label}
                value={controls.password.value}
                autoComplete = {controls.password.value}
                type = 'password'
                onChange={e => changeHandler(e.target.value, 'password')}
                variant="outlined"
                fullWidth={true}
                error =  {!controls.password.valid && controls.password.touched}
                helperText = {!controls.password.valid && controls.password.touched 
                    ? controls.password.errorMessage
                    : null}
            />
            <TextField
                className = 'formStyle_control'
                label={controls.repeatPassword.label}
                value={controls.repeatPassword.value}
                autoComplete = {controls.repeatPassword.value}
                type = 'password'
                onChange={e => changeHandler(e.target.value, 'repeatPassword')}
                variant="outlined"
                fullWidth={true}
                error =  {!(controls.repeatPassword.value === controls.password.value) && controls.repeatPassword.touched}
                helperText = {!(controls.repeatPassword.value === controls.password.value) && controls.repeatPassword.touched 
                    ? controls.repeatPassword.errorMessage
                    : null}
            />
        </form>
        <div className='formStyle__buttonWrapper'>
            <Button 
                variant="outlined" 
                color="primary" 
                className = 'RegistrationPage__button'
                disabled={!isFormValid}
                onClick = {registrationHandler}
            >{loading ? <CircularProgress size = {20}/> : 'Зарегистрироваться'}</Button>
        </div>
    </Paper>
</div>
    )
}

export default RegistrationPage