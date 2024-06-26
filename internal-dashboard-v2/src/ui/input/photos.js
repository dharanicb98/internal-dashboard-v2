import React, { useState } from 'react'
import { uploadMultipleImages } from '../../services/uploads.js'

function PhotosUpload() {
  const [uploadImages, setUploadImages] = useState([])

  const handleOnchangeImages = async (e) => {
    console.log('event', e.target.files[0])
    try {
      const response = await uploadMultipleImages( e.target.files[0] )
      setUploadImages((prev) => {return [...prev, response?.data[0]?.file_path]})
    }
    catch ( ee ) {
      console.log('e', ee)
    }
  }

  return (
    <div>
        <h1 className='leading-[38.73px] text-[32px] font-medium'>Photos</h1>
        <div className='relative mt-10 border-dashed border flex flex-col justify-center items-center  p-5 text-[#00000099] font-base leading-5'>
            <p>Click to Upload</p>
            <span>Or</span>
            <p>Images Drag and Drop</p>
            <input onChange={(e) => handleOnchangeImages(e)} type="file" className='absolute h-full w-full opacity-0'/>
        </div>

        {uploadImages && uploadImages.map((image, idx) => (
          <div key={idx} className='mt-10'>
              <img
                className='w-[200px] h-[200px]'
                src={`${process.env.REACT_APP_LISTING_URL}${image}`}
              />
          </div>
        ))}

    </div>
  )
}

export default PhotosUpload