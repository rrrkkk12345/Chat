import React from 'react'
import ReactDOM from 'react-dom'
import useReactRouter from 'use-react-router';


export const NextButton: React.FC<{ message: string, num: number }> = (props) => {
    return (
        <div>
            <button>{props.message}={props.num}</button>
        </div>
    )

}

//CSSできれいにする
export const selectButton: React.FC<{ message: string }> = (props) => {
    return (
        <div>
            <button>{props.message}</button>
        </div>
    )

}
