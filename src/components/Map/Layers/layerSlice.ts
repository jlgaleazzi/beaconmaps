import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Layer } from './ILayer';
import UnitPayload from './IUnitPayload';
export interface IssueInitialState {
  layers: Layer[];
}
const initialState: IssueInitialState =
                    {layers: [
                      {id:'0', label: 'Unidades', visible:true, units:[{"location":{"lat":19.5785526538128,"lng":-99.23744201660158},"identifier":"1","origin":" María","destination":" María"},{"location":{"lat":19.379170499941306,"lng":-99.228515625},"identifier":"2","origin":" Erico","destination":"Teófanes"},{"location":{"lat":19.376579509439622,"lng":-99.02183532714845},"identifier":"3","origin":" María","destination":"Sara"},{"location":{"lat":19.411554402377725,"lng":-98.87557983398439},"identifier":"4","origin":"Teófanes","destination":" Erico"}]},
                      {id:'1', label: 'Almacenes', visible:false, units:[]}]}




export const layerSlice = createSlice({
  name:'layers',
    initialState,
  reducers: {
    toggleVisiblity: (state, {payload}:PayloadAction<Layer>) => {
      const {id} = payload;
      const layerIndex = state.layers.findIndex((layer) => layer.id === id);
      if (layerIndex !== -1) {
        state.layers[layerIndex].visible = !state.layers[layerIndex].visible;
      }

    },
    addUnit: (state, {payload}:PayloadAction<UnitPayload>) => {
      const {layerId, unit} = payload;
      const layerIndex = state.layers.findIndex((layer) => layer.id ===layerId);
      state.layers[layerIndex].units?.push(unit);
    }
  },

}

)
export const {toggleVisiblity, addUnit} = layerSlice.actions;
export default layerSlice.reducer