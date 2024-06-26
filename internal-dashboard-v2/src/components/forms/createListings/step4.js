import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Step3({ payload, setPayload }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/categories`)
        setCategories(response.data.data)
    }
    fetchData()

    return(() => {})
  },[])
 
  function handleCategories(id) {
    const index = payload?.categories.indexOf(id)
    if (index === -1) {
      setPayload(prev => {return {...prev, categories:[...prev.categories, id]}})
    }
    else {
      const updateIds = [...payload.categories]
      updateIds.splice(index, 1)
      setPayload(prev => {return {...prev, categories:[...updateIds]}})
    }
  }

  return (
    <>
    <h1 className='my-5'>Select Categories</h1>
      <div className='flex flex-wrap items-center gap-8'>
       {categories && categories.map((category) => (
        <div onClick={() => handleCategories(category.id)}>
            <div className='cursor-pointer rounded-lg border-2' style={{border: payload?.categories?.includes(category.id) ?'2px solid black':'' }}>
              <img src={category.icon_path} alt={category.name} className='w-32 h-28'/></div>
            <h3 className='text-center mt-2 font-semibold text-lg'>{category?.name}</h3>
        </div>
       ))}
    </div>
    </>
  )
}

export default Step3