import React, { useState } from 'react'
import Button from '../../components/button';
import { uploadSingleImage } from '../../services/uploads';
import { useDispatch } from 'react-redux';
import {
    loaderStart,
    loaderSuccess,
    error,
  } from "../../store/reducers/loaderSlice";

function UploadImage({setShowUploadDialog, setIconPath, title}) {
  const [mediaUrl, setMediaUrl] = useState(null);

  const dispatch = useDispatch();

  const handleOnChangeFile = (e) => {
    let files = e.target.files[0]

    if ( files ){
      setMediaUrl(files)
    }
     console.log( files)
  }

  function getImageUrl( url ) {
    if ( url && typeof url === 'object' ) {
       return URL.createObjectURL(url)
    }
    return url
  }

  async function handleSave() {
    try {
    //   dispatch
      if ( mediaUrl ) {
        dispatch(loaderStart())
        const response = await uploadSingleImage( mediaUrl );
        let filePath = response?.data[0]?.file_path;
        dispatch(loaderSuccess())
        setIconPath(filePath);
        setShowUploadDialog((prev) => !prev)
        console.log( filePath )
      }
    }
    catch ( e ) {
        alert(e)
        dispatch(loaderSuccess())
    }
  }


  return (
    <div>
        {!mediaUrl && 
        <div className='relative'>
           <input className='absolute w-full h-full opacity-0 ' type='file' onChange={(e) => handleOnChangeFile(e)}/>
           <div className='flex flex-col items-center justify-center mt-2 border-[3px] border-dashed '>
              <p>Click to Upload</p>
              <p>Or</p>
              <p>Drag and Drop</p>
           </div>
        </div>}

        {mediaUrl && 
         <div className='flex flex-col items-center'>
          <h1 className='font-bold'>{title}</h1>
          <img src={getImageUrl(mediaUrl)} alt='image'  className='h-[80px] w-[80px] mt-3'/>
          </div>}
        <div className='py-5 flex items-center justify-between bottom-0 mt-10'>
            <Button type="outline" value="Clear" onClick = {()=>setMediaUrl(null)}/>
           <Button value='Upload' type = "secondary" onClick={handleSave}/>
        </div>
    </div>
  )
}

export default UploadImage