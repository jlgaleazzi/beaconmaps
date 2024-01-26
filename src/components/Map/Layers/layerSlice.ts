import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Layer } from './ILayer';
import UnitPayload from './IUnitPayload';
import { client } from  '../../../api/client'
export interface IssueInitialState {
  layers: Layer[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  wstatus: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}
const initialState: IssueInitialState =
                    {
                      layers: [
                        {"id":"0","label":"Unidades","visible":true, "units":[]},
                        {"id":"1","label":"Almacenes","visible":true, "units":[]}],
                      status: 'idle',
                      wstatus: 'idle',
                      error: null,
                    }



export const fetchUnits = createAsyncThunk('units/fetchUnits', async() => {
  const response = await client.get('/units')
  const unidades = response.layers.filter((el: { label: string; }) => el.label === "Unidades");
  return unidades
})

export const fetchWarehouses = createAsyncThunk('units/fetchWarehouse',async () => {
  const response = await client.get('/warehouses')
  const units = response.units;
  return units;
})

export const layerSlice = createSlice({
  name:'layers',
    initialState,
  reducers: {
    toggleVisiblity: (state, {payload}:PayloadAction<Layer>) => {
      const {id} = payload;
      const layerIndex = state.layers.findIndex((layer) => layer.id === id);

      if (layerIndex !== -1) {
        console.log( `toggleVisibility from ${id} -- ${JSON.stringify(state.layers[layerIndex].visible)}`)
        state.layers[layerIndex].visible = !state.layers[layerIndex].visible;
      }

    },
    addUnit: (state, {payload}:PayloadAction<UnitPayload>) => {
      const {layerId, unit} = payload;
      const layerIndex = state.layers.findIndex((layer) => layer.id ===layerId);
      state.layers[layerIndex].units?.push(unit);
    },
  },
  extraReducers : (builder) => {

    builder.addCase(fetchUnits.pending, (state,action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUnits.fulfilled, (state,action) => {
      if (state.status === 'loading' ) {
        state.status = 'succeeded'
       const layerIndex = state.layers.findIndex((layer) => layer.label === "Unidades");
       state.layers[layerIndex].units = action.payload[0].units
      }
    })
    builder.addCase(fetchUnits.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
    builder.addCase(fetchWarehouses.pending, (state,action) => {
     state.wstatus = 'loading'
    })
    builder.addCase(fetchWarehouses.fulfilled, (state,action) => {
      if (state.wstatus === 'loading' ) {
        state.wstatus = 'succeeded'
        const layerIndex = state.layers.findIndex((layer) => layer.label === "Almacenes");
       state.layers[layerIndex].units = action.payload;
      }
    })
    builder.addCase(fetchWarehouses.rejected, (state, action) => {
      state.wstatus = 'failed'
      state.error = action.error.message;
    })



  }

}

)
export const {toggleVisiblity, addUnit} = layerSlice.actions;
export default layerSlice.reducer