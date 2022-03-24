import React from 'react';
import {Space, Spin} from "antd";

const Loading = () => {
    return (
        <>
            <Space size='middle'>
                {/*{status === 'loading' && <h2>Loading<b>....</b></h2>}*/}
                {/*{error && <h2>An Error occurred:{error}</h2>}*/}
               <Spin size='large'/>
            </Space>
        </>
    );
};

export default Loading;