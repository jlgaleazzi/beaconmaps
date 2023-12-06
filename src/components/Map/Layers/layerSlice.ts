import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Layer } from './ILayer';

export interface IssueInitialState {
  layers: Layer[];
}
const initialState: IssueInitialState = 
                    {layers: [{id:'0', label: 'Unidades', visible:true},
                      {id:'1', label: 'Almacenes', visible:false}]}


                      

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

    }
  }
}

)
export const {toggleVisiblity} = layerSlice.actions;
export default layerSlice.reducer