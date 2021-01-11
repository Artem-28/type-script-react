import 'firebase/database'
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getOptionSelectDevisions } from '../../store/actions/actionSelectDevisions';
import { MyControlSelectDevision } from '../../entities/MyControls';
import { IDevision } from '../../interfaces/devision';
import { MyDevision } from '../../entities/MyDevision';

interface ISelectDevisionProps  {
  changeSelectDevision: (isValid: MyControlSelectDevision) => void
  control: MyControlSelectDevision
}

export interface IOptionsSelectType {
  devision: IDevision
}

const SelectDevisions: React.FC<ISelectDevisionProps> = ({changeSelectDevision, control}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IOptionsSelectType[]>([])
  const [value, setValue] = useState<string>('');
  const loading = open && options.length === 0 && value.trim().length !== 0;
  let timer: NodeJS.Timeout | undefined = undefined
  
  function changeSearch(value: string) {
    if (timer) {clearTimeout(timer)}
    timer = setTimeout(() => { setValue(value) }, 1000)
  }

  function changeHandler(event: React.ChangeEvent<{}>, newValue: IOptionsSelectType | null) {
    control.touched = true 
    if (newValue) {
      control.value = newValue.devision 
      control.valid = true
    } else {
      control.value = null 
      control.valid = false
    }
    changeSelectDevision(control)
  }
 
  useEffect(() => {
    let active = true
    if (!loading) { return undefined }
    (async () => {
        const devision: IOptionsSelectType[] = []
        const response = await getOptionSelectDevisions(value)
        response.forEach(item => {
          const newDevision = new MyDevision(item.val().name, new Date(item.val().date))
          newDevision.setId = item.val().id
          devision.push({devision: newDevision})
        })

      if (active) { setOptions(devision as IOptionsSelectType[]) }
    })()
    return () => { active = false }
  }, [loading, value])

  useEffect(() => { if (!open) { setOptions([]) } }, [open])
  console.log(value)
  return (
    <Autocomplete
      style={{ width: '100%' }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.devision.name === value.devision.name}
      getOptionLabel={(option) => option.devision.name}
      loadingText = {'Загрузка...'}
      noOptionsText = {'Нет таких подразделений'}
      options={options}
      loading={loading}
      onChange = {(event, newValue) => changeHandler(event, newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={control.label}
          variant="outlined"
          onChange={e => changeSearch(e.target.value)}
          error =  {!control.valid && control.touched}
          helperText ={!control.valid && control.touched? control.errorMessage : null}
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
  );
}

export default SelectDevisions