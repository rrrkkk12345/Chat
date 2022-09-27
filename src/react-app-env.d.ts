// / <reference types="react-scripts" />
declare module 'redux-persist';
declare module 'redux-persist/lib/storage/session'
declare module '*.png'
declare module '*.css' {
    interface IClassNames {
      [className: string]: string
    }
  
    const classNames: IClassNames;
    export = classNames;
  }
  