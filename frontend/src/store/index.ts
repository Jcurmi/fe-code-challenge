import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createEpicMiddleware } from 'redux-observable';
import pricesSlice from './pricesSlice';
import thunkMiddleware from 'redux-thunk';
import stocksSlice from '@/store/stocksSlice';
import priceHistorySlice from '@/store/priceHistorySlice';
import { dashboardOptionsSlice } from '@/store/dashboardOptionsSlice';
import rootEpic from '@/components/PriceChart/epics/epics';



const epicMiddleware = createEpicMiddleware();


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pricesSlice.name]: pricesSlice.reducer,
    [stocksSlice.name]: stocksSlice.reducer,
    [priceHistorySlice.name]: priceHistorySlice.reducer,
    [dashboardOptionsSlice.name]: dashboardOptionsSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([epicMiddleware, thunkMiddleware])
});


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

epicMiddleware.run(rootEpic);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
