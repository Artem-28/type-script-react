import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Ilink} from '../../../interfaces/link'



interface IlinksListProps {
    links: Ilink[]
    activeLink: string
    display: 'flex' | 'block'
    onClickLinkHandler(active: string): void
}

const MenuLinks: React.FC<IlinksListProps> = ({links, display, onClickLinkHandler, activeLink}) => {
    return (
        <List 
            component="nav" 
            aria-label="main mailbox folders" 
            style = {{display: `${display}`}}
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
    </List>
    )
}

export default MenuLinks