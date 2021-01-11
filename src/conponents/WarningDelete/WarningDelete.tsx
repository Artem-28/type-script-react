import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import './WarningDelete.css'

interface IWarningDeleteProps {
    isOpen: boolean
    nameItem: string | null
    onClick: (confirm:boolean) => void
}

const WarningDelete: React.FC<IWarningDeleteProps> = ({nameItem, isOpen, onClick})=>{
    return (
        <Backdrop style={{zIndex: 1}} open={isOpen} >
            <div className = 'WarningDelete__alert'>
                <Alert 
                    variant="outlined"
                    severity="error"
                    action={
                        <div className = 'WarningDelete__alert__button'>
                            <Button 
                                color='secondary' 
                                variant="contained"  
                                size="small" disableElevation
                                onClick = {() => onClick(true)}
                            > ДА </Button>
                            <Button 
                                color='secondary' 
                                variant="contained"  
                                size="small" 
                                disableElevation
                                onClick = {() => onClick(false)}
                            > НЕТ </Button>
                        </div>
                      }
                    >
                    Вы действительно хотите удалить 
                    &nbsp;<strong>{nameItem}</strong>&nbsp;
                    из списка, без возможности восстановления?
                </Alert>
            </div>
        </Backdrop>
    )
}

export default WarningDelete