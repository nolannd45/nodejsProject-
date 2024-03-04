import React from 'react'

const Apropos = ({ data }) => {

    return (
        <>
            <span className='text-2xl font-semibold text-white underline'>A propos de l'hôtel</span>
            <h2 className='font-semibold text-white mt-2'>{data.description}</h2>
        </>
    )
}

export default Apropos;