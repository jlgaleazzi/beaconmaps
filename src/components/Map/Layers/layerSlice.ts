import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Layer } from './ILayer';
import UnitPayload from './IUnitPayload';
import { client } from  '../../../api/client'
export interface IssueInitialState {
  layers: Layer[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}
const initialState: IssueInitialState =
                    {
                      layers: [
                        {"id":"0","label":"Unidades","visible":true, "units":[]},
                        {"id":"1","label":"Almacenes","visible":true, "units":[]}],
                      status: 'idle',
                      error: null,
                    }

export const fetchLayers = createAsyncThunk('units/fetchLayers', async() => {
   const response = await client.get('/units')
   return response.layers;
},)

export const fetchUnits = createAsyncThunk('units/fetchUnits', async() => {
  const response = await client.get('/units')
  const unidades = response.layers.filter((el: { label: string; }) => el.label === "Unidades");
  console.log(`fetchUnits ${JSON.stringify(unidades)}`)
  return unidades
})

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
    },
  },
  extraReducers : (builder) => {
    builder.addCase(fetchLayers.pending, (state,action) => {
      state.status = 'loading'
      })
    builder.addCase(fetchLayers.fulfilled , (state, action) => {
      if (state.status === 'loading') {
        state.status = 'succeeded'
        state.layers = action.payload
      }
    })
    builder.addCase(fetchLayers.rejected , (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
    builder.addCase(fetchUnits.pending, (state,action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUnits.fulfilled, (state,action) => {
      if (state.status === 'loading' ) {
        state.status = 'succeeded'
       const layerIndex = state.layers.findIndex((layer) => layer.label === "Unidades");
       console.log(` layerIndex ${layerIndex} -> builder addCase ${action.payload}`)
       state.layers[layerIndex].units = action.payload[0].units
      }

    })
    builder.addCase(fetchUnits.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })



  }

}

)
export const {toggleVisiblity, addUnit} = layerSlice.actions;
export default layerSlice.reducer