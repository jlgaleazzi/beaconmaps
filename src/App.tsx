
import "leaflet/dist/leaflet.css";
import {styled, useTheme, theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { styled } from "@mui/material";


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar , {
  shouldForwardProp: (prop) => prop !== 'open',})
  <AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([`width`,`margin`],{
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    

  }))

function App() {
  return (
    <>
    
      <MapContainer center={[51.505, -0.09]} zoom={13} >
       <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
    </MapContainer>
    </>
  )
}

export default App
