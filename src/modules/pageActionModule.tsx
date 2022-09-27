import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { rootReducer } from "./rootState";

export interface PageAction {
  loading: boolean
};

const PageActionInitialState: PageAction = {
  loading: false,
};

const PageActionModule = createSlice({
  name: 'pageAction',
  initialState: PageActionInitialState,
  reducers: {
    setLoading: (state, action: PayloadAction<PageAction>) => action.payload,
  },
});

export const usePageAction = () => {
  return useSelector((state: ReturnType<typeof rootReducer>) => state);
};

export default PageActionModule;
