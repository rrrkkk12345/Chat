import { combineReducers } from '@reduxjs/toolkit';
// import LoginInfoModule, { LoginInfo } from './loginInfoModule';
import PageActionModule, { PageAction } from './pageActionModule';
// import ModalActionModule, { ModalAction } from './modalActionModule';
// import PreviewActionModule, { PreviewAction } from "./previewActionModule";
// import ResumeStoreModule, { ResumeStoreState } from "./resumeStoreModule";

export interface RootState {
  // loginInfo: LoginInfo;
  pageAction: PageAction;
  // modalAction: ModalAction;
  // previewAction: PreviewAction;
  // resumeStore: ResumeStoreState;
};

export const rootReducer = combineReducers({
  // loginInfo: LoginInfoModule.reducer,
  pageAction: PageActionModule.reducer,
  // modalAction: ModalActionModule.reducer,
  // previewAction: PreviewActionModule.reducer,
  // resumeStore: ResumeStoreModule.reducer,
});
