import { configureStore } from '@reduxjs/toolkit';
import layerReducer from '../components/Map/Layers/layerSlice';
import trucksReducer from '../components/Map/Layers/Unidades/trucksSlice';
import warehouseReducer from '../components/Map/Layers/Unidades/warehouseSlice';
const store = configureStore({
    reducer: {
        layers: layerReducer,
        trucks: trucksReducer,
        warehouses: warehouseReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;