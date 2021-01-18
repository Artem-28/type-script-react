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
import './AuthPage.css'
import { loginUser } from '../../store/actions/actionAuthUser';
import { useHistory } from 'react-router-dom';



export interface IControlAuth {
    email: MyControlText
    password: MyControlText
}

const AuthPage: React.FC = () => {
    const history = useHistory()
    const loading = useSelector((state: AppState) => state.loading)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlAuth>({
        email: new MyControlText(
            {required: true, email: true}, 
            '', 
            'Введите email',
            'Введен некорректный email'),
        password: new MyControlText(
            {required: true, minLength: 6}, 
            '', 
            'Введите пароль', 
            'Пароль должен содержать 6 символов'),
    })
   

   
    function changeHandler<T extends keyof typeof controls>(value: string, controlName: T): void {
        const newControls = controls
        const control = newControls[controlName]
        control.value = value
        control.touched = true
        validateControl(control)
        const formValid = formValidateControl(controls)
        setControls({...newControls})
        setIsFormValid(formValid)
    }

    function loginHandler() {
        loginUser(controls.email.value, controls.password.value)
        history.push('/')
    }



    
    return (
        <div className = 'formStyle__conteiner'>
        <Paper elevation={7} className='formStyle__paper AuthPage__paper'>
        <div className = 'formStyle__loader'>
            {loading ? <LinearProgress /> : null }
        </div>
        <h2 className='formStyle__header'>Войти в личный кабинет</h2>
        <form className='formStyle__form AuthPage__formManager'>
            <TextField
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
        </form>
        <div className='formStyle__buttonWrapper'>
            <Button 
                variant="outlined" 
                color="primary" 
                className = 'formStyle__button'
                disabled={!isFormValid }
                onClick = {loginHandler}
            >{loading ? <CircularProgress size = {20}/> : 'Войти'}</Button>
        </div>
    </Paper>
</div>
    )
}

export default AuthPage