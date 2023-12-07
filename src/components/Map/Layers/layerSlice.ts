import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Layer } from './ILayer';
import UnitPayload from './IUnitPayload';
export interface IssueInitialState {
  layers: Layer[];
}
const initialState: IssueInitialState = 
                    {layers: [
                      {id:'0', label: 'Unidades', visible:true, units:[]},
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