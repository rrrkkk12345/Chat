import React, { useState } from 'react';
import useReactRouter from 'use-react-router';

const InputInfo: React.FC = () => {

    const { history } = useReactRouter();
    return (
        <div>
            <div>
                <label>お名前</label>
                <input
                    type="text"
                    name="name"
                    placeholder="山田 太郎"
                />
            </div>
            <div>
                <label>生年月日</label>
                <input type="date" name="birthday" id="birthday"></input>
            </div>
            <button onClick={()=>history.push('/topPage')}>完了</button>
        </div>
    )
}

export default InputInfo;