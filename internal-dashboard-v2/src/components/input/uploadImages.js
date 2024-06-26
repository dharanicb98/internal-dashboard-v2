import React, { useState } from "react";
import axios from "axios";
import { uploadSingleImages } from "../../services/uploadsServices";

function UploadImages() {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleFile = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    let files = null;
    if (e.dataTransfer && e.dataTransfer.files) {
      files = Array.from(e.dataTransfer.files);
    } else {
      files = Array.from(e.target.files);
    }

    // console.log(files)

    try {
      const formData =  new FormData()
      // formData.append('image', files)
      files.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });
      console.log('form data', formData)
      // const data = await uploadSingleImages(formData) 
      // await Promise.all(data)
      // console.log('-------------------',data)

      // console.log('try 1')
      // const imageUpload = files.map( async ( data ) => {
      // const formData = new FormData()
      // formData.append('image', data)
      // console.log('try 2', formData)
      // const image = await uploadSingleImages(data)
      // })
      // await Promise.all(imageUpload)
      // console.log('try 3')
      return;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div
        className={`w-[100%]  border-2 border-dashed flex flex-col justify-center items-center  p-5 ${
          dragging ? "bg-green-200" : "bg-slate-100"
        }`}
        onDrop={handleFile}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <p className="my-2">Drag and Drop photos here</p>
        <p className="my-2">or</p>
        <input type="file" multiple="multiple" onChange={handleFile} />
      </div>
    </div>
  );
}

export default UploadImages;
