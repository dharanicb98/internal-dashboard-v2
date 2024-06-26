import React, { useEffect, useState } from 'react'
import PhotosUpload from '../../ui/input/photos'

function Photos( { payload, setPayload } ) {
  const [imageIds, setImageIds] = useState([])

  // useEffect(() => {
  //   let getIds = payload?.media?.map(( item ) => {return item?.id})
  //   if ( getIds.length > 0 ) {
  //       getImages()
  //   }
  // }, [])


  function getImages() {
    // filters: [{ col: "id", val: filterImageIds, type: "array" }]
  }


  // console.log('media', payload?.media)

  return (
    <div>
        <PhotosUpload/>
    </div>
  )
}

export default Photos