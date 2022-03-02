import reducer from './reducer';
import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'rxcrud',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch