import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Layer } from './ILayer';
import UnitPayload from './IUnitPayload';
import { client } from  '../../../api/client'
export interface IssueInitialState {
  layers: Layer[],
}
const initialState: IssueInitialState =
                    {
                      layers: [
                        {"id":"0","label":"Unidades","visible":true},
                        {"id":"1","label":"Almacenes","visible":true,}],
                    }





export const layerSlice = createSlice({
  name:'layers',
    initialState,
  reducers: {
    toggleVisibility: (state, {payload}:PayloadAction<Layer>) => {
      const {id} = payload;
      const layerIndex = state.layers.findIndex((layer) => layer.id === id);

      if (layerIndex !== -1) {
        console.log( `toggleVisibility from ${id} -- ${JSON.stringify(state.layers[layerIndex].visible)}`)
        state.layers[layerIndex].visible = !state.layers[layerIndex].visible;
      }

    },

  }
})
export const {toggleVisibility} = layerSlice.actions;
export default layerSlice.reducer