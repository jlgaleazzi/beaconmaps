

import  {useState} from 'react';
import {styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Save from '@mui/icons-material/Save';
import Map from './components/Map';

import { CssBaseline, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import MenuList from "./components/menu/menuList";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: '64px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    paddingTop: '64px',
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
const dark = createTheme({
  palette: {
    mode: 'dark'
  }
})
const [open,setOpen] = useState(false);


const handleDrawerOpen = () => {
  setOpen(true);
}

const handleDrawerClose = () => {
  setOpen(false);
}
  return (
    <ThemeProvider theme={dark}>
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
            <Box sx={{flexGrow:1}}/>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              <IconButton size='large' aria-label="Generate">
                <Save/>
              </IconButton>
            </Box>
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
        <MenuList />
        </Drawer>
      <Main open={open}>
        <Map />
      </Main>
      </Box>
    </ThemeProvider>
  )
}

export default App
