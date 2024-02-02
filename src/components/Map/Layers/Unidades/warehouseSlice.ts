import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UnitPayload from "../IUnitPayload";
import { client } from "../../../../api/client";
import IUnit from "../Iunits";


export interface IssueInitialState {
  units: IUnit[],
  visible: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,

}
const initialState: IssueInitialState = {
  units:[],
  visible: true,
  status: 'idle',
  error: null,
}

export const fetchWarehouses = createAsyncThunk('/units/fetchwarehouse',
async () => {
  const response = await client.get('/warehouses')
  const units = response.units;
  return units;
})

export const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.visible = !state.visible
    },
    addUnit: (state, {payload}: PayloadAction<UnitPayload>) => {
      const {unit} = payload;
      state.units.push(unit)
    }
  },
  extraReducers : (builder) => {
    builder.addCase(fetchWarehouses.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchWarehouses.fulfilled, (state, action) => {
      if (state.status === 'loading') {
        state.status = 'succeeded'
        state.units = action.payload
      }
    })
    builder.addCase(fetchWarehouses.rejected, (state,action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

  },
})

export const {addUnit, toggleVisibility} = warehousesSlice.actions
export default warehousesSlice.reducer