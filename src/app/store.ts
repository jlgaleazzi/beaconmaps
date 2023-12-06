import { configureStore } from '@reduxjs/toolkit';
import layerReducer from '../components/Map/Layers/layerSlice';

const store = configureStore({
    reducer: {
        layers: layerReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;