
import {List ,ListItemButton, ListItemIcon, ListItem, ListItemText, Collapse, Checkbox} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';


const MenuList = () => {
    const [checked,setChecked] = useState([1])
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }

    const handleToggle = (value:number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);
    }

    return (
        <List 
        sx={{width:'100%', maxWidth:'240px'}}
        component='nav'
        aria-labelledby='left-menu' 
        >
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary ='Layers' />
            {open ? <ExpandLess /> : <ExpandMore/>}
        </ListItemButton>    
        <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
                <ListItem key='units'
                secondaryAction={
                    <Checkbox 
                    edge='end'
                    onChange={handleToggle(1)}
                    checked={checked.indexOf(1) !== -1}
                     />
                }
                disablePadding
                >
                    <ListItemButton sx={{pl:4}}>
                        <ListItemText primary='Unidades' />
                    </ListItemButton>
                </ListItem>
                <ListItem key='stores'
                secondaryAction={
                    <Checkbox 
                    edge='end'
                    onChange={handleToggle(2)}
                    checked={checked.indexOf(2) !== -1}
                     />
                }
                disablePadding
                >
                    <ListItemButton sx={{pl:4}}>
                        <ListItemText primary='Almacenes' />
                    </ListItemButton>
                </ListItem>

              
            </List>

        </Collapse>
        </List>
    )
}

export default MenuList