
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const openedMixin = (theme:Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

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
       width: `cals(100% - ${drawerWidth}px)`,
       marginLeft: `${drawerWidth}px`, 
      transition: theme.transitions.create(['margin','width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));



// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

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
    <>

      <MapContainer center={[51.505, -0.09]} zoom={13} >
       <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
    </MapContainer>
    </>
    </Box>
  )
}

export default App
