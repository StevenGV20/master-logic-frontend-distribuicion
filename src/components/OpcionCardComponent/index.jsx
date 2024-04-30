import React from 'react';

const OpcionCardComponent = ({route}) => {
    return (
        <div className='border-2 border-gray-400 w-full text-black'>
            <div className='w-48 h-60'>
            <img src={route.icon}/>
            </div>
            <h3 className='h-20 w-full text-center font-bold px-4 content-center'>{route.name}</h3>
        </div>
    );
}

export default OpcionCardComponent;
