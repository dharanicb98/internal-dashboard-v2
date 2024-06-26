import React, { useState } from "react";
import { HomeIcon } from "../icons";

const Select = ({ name, id, image, setSelectedItem, selectedItem }) => {
  // console.log(id,selectedItem.includes(id));
  const borderProp = selectedItem.includes(id) ? "border border-black " : "";

  const addItem = (id) => {
    const findIndex = selectedItem.indexOf(id);
    // console.log(findIndex);
    if (findIndex === -1) {
      //if "id: is not found
      setSelectedItem((prev) => [...prev, id]);
    } else {
      //if "id" is present
      const updateIds = [...selectedItem];
      updateIds.splice(findIndex, 1);
      setSelectedItem(updateIds);
    }

    // const existingId = selectedItem.includes(id);
    // if (existingId) {
    //   let newList = selectedItem.filter((el) => {
    //     return el !== id;
    //   });
    //   setSelectedItem(newList);
    // } else setSelectedItem((prev) => [...prev, id]);
  };
  return (
    <>
      <div
        onClick={() => {
          addItem(id);
        }}
      >
        {/* <div className="flex justify-end">
          <div className="py-2 w-[20px]  border-2 border-black rounded-full"></div>
        </div> */}
        <div className={`p-4 ${borderProp} rounded-lg flex flex-col`}>
          <img className="w-[60px] h-[60px]" src={image} alt="loading" />
        </div>
        <h3 className="text-center text-slate-500 text-xl font-sm font-serif">
          {name}
        </h3>
      </div>
    </>
  );
};

export default Select;

// function Step3({ payload, setPayload, handleInput }) {
//   const [categories, setCategories] = useState([{id:1, name:'one'}, {id:2, name:'second'}, {id:3, name:'third'}, {id:4, name:'fourth'}])
//   const [categoriespayload, setCategoriesPayload] = useState([])

//   const handleCategories = (id) => {
//     const findIndex = categoriespayload.indexOf(id)

//     if (findIndex === -1) {
//       //if id is not present
//         setCategoriesPayload((prev) => [...prev, id])
//     }
//     else {
//       //if id is present
//         const updateIds = [...categoriespayload]
//         updateIds.splice(findIndex, 1)
//         setCategoriesPayload(updateIds)
//     }
//   }

//   return (
//     <div>
//         {categories && categories.map((data, index) => (
//           <div
//             //doing styling
//             style={{backgroundColor: categoriespayload.includes(data.id) ? 'red' : '' }}
//             onClick={() => handleCategories(data.id)} key={index}>{data.name}</div>
//         ))}
//     </div>
//   )
// }

// export default Step3;
