import React, { useEffect, useState } from 'react'
import SelectDropdown from '.'
import { getListingId } from '../../services/checkoutServices'



// const options = [
//     {id : 1 , value : "India"},
//     {id : 2 , value : "Skimbox"},
//     {id : 3 , value : "test 1"},
//     {id : 4 , value : "test 2"},
//     {id : 5 , value : "Delhi"},
//     {id : 6 , value : "Bangalore"},
// ]

const SearchInput = () => {
  const [selectedOptions, setSelectedOptions] = useState("")
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await getListingId();
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  let ListingId = data.map((each) => {
    const { title, listing_id } = each;
    return { value: title, id: listing_id };
  });

  // console.log("this select", selectedOptions)


  return (
    <div className='ml-[50px]'>
      <SelectDropdown
        options={ListingId}
        onChange={(item) => setSelectedOptions(item)}
        placeholder='Search Items'
        label={"Listing ID"}
        className={"w-[350px]"}
      />
      <p className='mt-10'>Selected Option : {selectedOptions}</p>

    </div>
  )
}

export default SearchInput