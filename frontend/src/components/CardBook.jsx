import React from 'react'

const CardBook = ({ img, hotelName,dateStart, dateEnd }) => {
    console.log(dateEnd)
    return (
        <div className='md:w-80 md:h-80 w-32 h-32 flex flex-col' title={hotelName} >
        
            <img src={require(`/src/imageHotel/${img}.jpg`)} alt="Im@ge" className='w-full h-full rounded-t-md' />

            <span className='p-4 text-lg text-black font-semibold '>{hotelName.slice(0, 25)}</span>
            <span className='p-4 text-lg text-black font-semibold '>{dateStart} - {dateEnd}</span>

        </div>
    )
}

export default CardBook;