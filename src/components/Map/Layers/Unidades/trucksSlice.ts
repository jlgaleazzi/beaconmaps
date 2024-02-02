import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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

export const fetchTrucks = createAsyncThunk('units/fetchTrucks', async()=> {
  const response = await client.get('/units')
  const unidades = response.layers.filter((el: {label:string;}) => el.label === "Unidades");
  return unidades
})

export const truckSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.visible  = !state.visible;
    },
    addUnit: (state, {payload}: PayloadAction<UnitPayload>) => {
      const {unit} = payload;
      state.units.push(unit);
    }
  },
  extraReducers : (builder) => {
    builder.addCase(fetchTrucks.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchTrucks.fulfilled,(state, action) => {
      if (state.status === 'loading') {
        state.status = 'succeeded'
        console.log(`action.payload ${JSON.stringify(action.payload[0].units)}`)
        state.units = action.payload[0].units
      }
    })
    builder.addCase(fetchTrucks.rejected, (state,action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const {addUnit, toggleVisibility} = truckSlice.actions;
export default truckSlice.reducer