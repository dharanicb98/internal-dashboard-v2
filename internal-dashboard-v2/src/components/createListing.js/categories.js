import React from 'react'
import { useSelector } from 'react-redux'
import Checkbox from '../../ui/input/checkbox'

function Categories({payload, setPayload}) {
 const attributes = useSelector((state) => state.attributes)

  const handleCategory = ( id ) => {
    let checkIdIndex = payload.categories.indexOf( id )

    if ( checkIdIndex === -1 ) {
        setPayload(prev => {return {...prev, categories:[...prev.categories, id]}})
    }
    else {
      let updateNewID = [...payload.categories]
      updateNewID.splice( checkIdIndex, 1 );
      setPayload(prev => {return {...prev, categories:[...updateNewID]}});
    }
  }

  return (
    <div>
        <h1 className='leading-[38.73px] text-[32px] font-medium'>Categories</h1>
        <div className='mt-3'><span className='text-[#000000] leading-6 text-xl font-normal'>Pick the property categories that fit your space best, creating a personalized listing that showcases your property's uniqueness</span></div>
        <div className='grid grid-cols-4 gap-6 mt-6'>
            {attributes?.categories?.data?.map((category, idx) => (
                <div onClick={() => handleCategory(category?.id)} key={idx} style={{borderColor: payload?.categories?.includes(category.id) ?'black':'' }}
                    className={`border border-[#D9D9D9] flex flex-col items-center justify-center mt-2  w-[178px] h-[93px] rounded-xl relative cursor-pointer`}>
                    <img src={category?.icon_path} alt={`category-${category}`}  className="w-[45px] h-[40px]"/>
                    <span className='text-[#5C5C5C]  leading-6 text-sm font-normal'>{category?.name}</span>
                    <Checkbox checked={payload?.categories?.includes(category.id)} className='absolute top-4 right-3 cursor-pointer'/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Categories