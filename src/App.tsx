
import "leaflet/dist/leaflet.css";
import  {useState} from 'react';
import {styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const AppBar = styled(MuiAppBar , {
  shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create([`margin`,`width`],{
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
       width: `calc(100% - ${drawerWidth}px)`,
       marginLeft: `${drawerWidth}px`, 
      transition: theme.transitions.create(['margin','width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


function App() {

const theme = useTheme();
const [open,setOpen] = useState(false);

const handleDrawerOpen = () => {
  setOpen(true);
}

const handleDrawerClose = () => {
  setOpen(false);
}
  return (
    <Box sx={{display:'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton 
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{marginRight: 5, ...(open && { display: 'none'}),
        }}
          >
           <MenuIcon/>
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Transportes Pegaso
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
      sx={{
        width: drawerWidth,
        flexShrink:0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
      >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon/> :<ChevronRightIcon/> } 
        </IconButton>
      </DrawerHeader>
      <Divider/>
      </Drawer>
    <Main open={open}>
      <DrawerHeader />
      <MapContainer center={[51.505, -0.09]} zoom={13} >
       <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
    </MapContainer>
    </Main>
    </Box>
  )
}

export default App
