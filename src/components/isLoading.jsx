import React from 'react';
import '../styles/isLoading.css'

const IsLoading = () => {
    return (
        <>
            <div className='overlay'>
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </>
    );
};

export default IsLoading;