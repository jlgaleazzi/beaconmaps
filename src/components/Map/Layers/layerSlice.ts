import {createSlice} from '@reduxjs/toolkit'

export const layerSlice = createSlice({
  name:'layers',
    initialState:
      [{id:0, label: 'Unidades', visible:false},
       {id:1, label: 'Almacenes', visible:false}]
    ,

  reducers: {
    toggleVisiblity: (state, layer) => {

    }
  }
}

)

export