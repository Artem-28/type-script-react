import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import './Navbar.css'
import MenuLinks from '../MenuLinks/MenuLinks';
import { MyLink } from '../../../entities/MyLink'
import {Ilink} from '../../../interfaces/link'
import { useHistory } from 'react-router-dom';

const Navbar: React.FC = () => {
    const history = useHistory()
    const links:Ilink[]= [
        new MyLink('/add-manager', 'Добавить менеджера', <PersonAddIcon/>),
        new MyLink('/', 'Список менеджеров', <GroupIcon/>),
        new MyLink('/subdivision', 'Список подразделений', <AssignmentIcon/>)
    ]
    
    const [activeLink, setActiveLink] = useState<string>('/')
    const [isOpenDrawer, setIsOpenDrawer] = React.useState<boolean>(false);

    const onClickLinkHandler = (active: string,) => {
        setActiveLink(active);
        history.push(active)
        setIsOpenDrawer(false)
    };
    
    return (
        <div className='conteiner'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={()=>setIsOpenDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className='title'>
                        <Typography variant='h6'>
                            News
                    </Typography>
                    </div>
                    <div className='menuItem'>
                        <MenuLinks 
                            links = {links}
                            activeLink = {activeLink}
                            display='flex' 
                            onClickLinkHandler={onClickLinkHandler}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                <div className='drawer'>
                    <MenuLinks
                        links = {links}
                        activeLink = {activeLink}
                        display='block'
                        onClickLinkHandler={onClickLinkHandler}
                    />
                </div>
            </Drawer>
        </div>

    )
}

export default Navbar