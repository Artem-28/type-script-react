import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import './AddManagerPage.css'
import { MyControlDate, MyControlText } from '../../entities/MyControls';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppState } from '../../store/redusers/rootReduser';
import { validateControl } from '../../validateFormControls/validateControl';
import { formValidateControl } from '../../validateFormControls/validateForm';
import { valueControlType } from '../../interfaces/formControl';
import { getOptionSelectDevisions } from '../../store/actions/actionSelectDevisions';
import { SendManager } from '../../entities/MyManager';
import { addedManager } from '../../store/actions/actionListManagers';

export interface IControlsManager {
    name: MyControlText
    lastName: MyControlText
    devision: MyControlText
    date: MyControlDate
}

interface IOptionsSelectType {
    title: string
    key: string | null
}

const AddManagerPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [openSelect, setOpenSelect] = useState(false)
    const [optionsSelect, setOptionsSelect] = useState<IOptionsSelectType[]>([])
    const [currentOption, setCurrentOption] = useState<IOptionsSelectType | null>(null)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [controls, setControls] = useState<IControlsManager>({
        name: new MyControlText({ required: true }, '', 'Имя'),
        lastName: new MyControlText({ required: true }, '', 'Фамилия'),
        devision: new MyControlText({ required: true }, '', 'Выбирите подразделение'),
        date: new MyControlDate({ required: false }, new Date(), 'Дата регистрации')
    })
    const loading = useSelector((state: AppState) => state.loading)
    const loadingSelect = openSelect && optionsSelect.length === 0 && searchValue.trim().length !== 0
    let timer: NodeJS.Timeout | undefined = undefined

    function changeHandlerSelect(newValue: IOptionsSelectType | null) {
        setCurrentOption(newValue)
        if (newValue !== null) {
            changeHandler(newValue.key, 'devision')
        } else {
            changeHandler('', 'devision')
        }
    }
    
    function changeSearch(value: string) {
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(() => { setSearchValue(value) }, 1000)
    }

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

    function createNewManager(): void {
        const manager = new SendManager(
            controls.lastName.value,
            controls.name.value,
            controls.devision.value,
            controls.date.value || new Date()
        )
        const clearControls = controls
        controls.lastName.clear()
        controls.name.clear()
        controls.devision.clear()
        controls.date.currentDate()
        addedManager(manager)
        setIsFormValid(false)
        setCurrentOption(null)
        setControls({ ...clearControls })
    }

    useEffect(() => {
        let active = true
        if (!loadingSelect) { return undefined }
        (async () => {
            const devision: IOptionsSelectType[] = []
            const response = await getOptionSelectDevisions(searchValue)
            response.forEach(item => {
                devision.push({ title: item.val().name, key: item.key })
            })
            if (active) { setOptionsSelect(devision as IOptionsSelectType[]) }
        })()
        return () => { active = false }
    }, [loadingSelect, searchValue])

    useEffect(() => { if (!openSelect) { setOptionsSelect([]) } }, [openSelect])


    return (
        <div className='formStyle__conteiner'>
            <Paper elevation={7} className='formStyle__paper addManager__paper'>
                <div className='formStyle__loader'>
                    {loading ? <LinearProgress /> : null}
                </div>
                <h2 className='formStyle__header'>Добавление нового менеджера</h2>
                <form className='formStyle__form addManager__formManager'>
                    <TextField
                        className = 'formStyle_control'
                        label={controls.name.label}
                        value={controls.name.value}
                        onChange={e => changeHandler(e.target.value, 'name')}
                        variant="outlined"
                        fullWidth={true}
                        error={!controls.name.valid && controls.name.touched}
                        helperText={!controls.name.valid && controls.name.touched
                            ? controls.name.errorMessage
                            : null}
                    />
                    <TextField
                        className = 'formStyle_control'
                        label={controls.lastName.label}
                        value={controls.lastName.value}
                        onChange={e => changeHandler(e.target.value, 'lastName')}
                        variant="outlined"
                        fullWidth={true}
                        error={!controls.lastName.valid && controls.lastName.touched}
                        helperText={!controls.lastName.valid && controls.lastName.touched
                            ? controls.lastName.errorMessage
                            : null}
                    />
                    <Autocomplete
                        className = 'formStyle_control'
                        style={{ width: '100%' }}
                        autoComplete={true}
                        open={openSelect}
                        onOpen={() => setOpenSelect(true)}
                        onClose={() => setOpenSelect(false)}
                        getOptionSelected={(option, value) => option.title === value.title}
                        getOptionLabel={(option) => option.title}
                        loadingText={'Загрузка...'}
                        noOptionsText={'Нет таких подразделений'}
                        value={currentOption}
                        options={optionsSelect}
                        loading={loadingSelect}
                        onChange={(event, newValue) => changeHandlerSelect(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={controls.devision.label}
                                variant='outlined'
                                onChange={e => changeSearch(e.target.value)}
                                error={!controls.devision.valid && controls.devision.touched}
                                helperText={!controls.devision.valid && controls.devision.touched
                                    ? controls.devision.errorMessage
                                    : null}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="primary" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            className = 'formStyle_control'
                            format="dd/MM/yyyy HH:mm"
                            label={controls.date.label}
                            inputVariant="outlined"
                            value={controls.date.value}
                            onChange={value => changeHandler(value, 'date')}
                        />
                    </MuiPickersUtilsProvider>
                </form>
                <div className='formStyle__buttonWrapper'>
                    <Button
                        variant="outlined"
                        color="primary"
                        className='formStyle__button'
                        disabled={!isFormValid}
                        onClick={createNewManager}
                    >{loading ? <CircularProgress size={20} /> : 'Добавить'}</Button>
                </div>
            </Paper>
        </div>
    )
}


export default AddManagerPage