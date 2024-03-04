import React from 'react'

const HotelImages = ({ data }) => {
    return (
        <>{data && data?.images?.map((item) => {
            return (
                <div key={item._id} className='md:max-w-[400px]  w-full hover:scale-105 duration-700 '>
                    <img src={item?.img.includes('w=720') ? item.img : `https://a0.muscache.com/im/pictures/miso/Hosting-36986800/original/957dfda9-e4ab-45fd-918e-f51af0451757.jpeg?im_w=720`} alt={'No @imag%e@- Found'} className='rounded-md' />
                </div>
            )
        })}</>
    )
}

export default HotelImages;