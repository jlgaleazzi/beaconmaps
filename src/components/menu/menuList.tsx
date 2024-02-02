
import {List ,ListItemButton, ListItemIcon, ListItem, ListItemText, Collapse, Checkbox} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { toggleVisibility } from '../Map/Layers/layerSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Layer } from '../Map/Layers/ILayer';

const MenuList = () => {
    const layers = useAppSelector((state) => state.layers.layers);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }

    const handleToggle = (lyr:Layer) => () => {

        dispatch(toggleVisibility(lyr))

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
              {layers.map((layer)=> (
                <ListItem key={layer.id}
                secondaryAction={
                        <Checkbox edge='end'
                        onChange={handleToggle(layer)}
                        checked={layer.visible}
                    />
                    }
                    disablePadding
                >
                     <ListItemButton sx={{pl:4}}>
                        <ListItemText primary={layer.label} />
                    </ListItemButton>
                </ListItem>
              ))
              }
            </List>
        </Collapse>
        </List>
    )
}

export default MenuList