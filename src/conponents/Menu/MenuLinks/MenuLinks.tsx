import React from 'react'
import {useSelector} from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Ilink } from '../../../interfaces/link'
import { logoutUser } from '../../../store/actions/actionAuthUser';
import { AppState } from '../../../store/redusers/rootReduser';

interface IlinksListProps {
    links: Ilink[]
    activeLink: string
    display: 'flex' | 'block'
    onClickLinkHandler(active: string): void
}

const MenuLinks: React.FC<IlinksListProps> = ({ links, display, onClickLinkHandler, activeLink }) => {
    const isLogin = useSelector((state: AppState) => state.currentUserApp.user)
    return (
        <List
            component="nav"
            aria-label="main mailbox folders"
            style={{ display: `${display}` }}
        >
            {links.map(link => {
                return (
                    <ListItem
                        key={link.label}
                        button
                        selected={activeLink === link.path}
                        onClick={() => onClickLinkHandler(link.path)}
                    >
                        <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.label} />
                    </ListItem>
                )
            })}
            {!!isLogin
            ? <ListItem button onClick={logoutUser} >
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Выйти' />
            </ListItem>
            : null
            }
            
        </List>
    )
}

export default MenuLinks