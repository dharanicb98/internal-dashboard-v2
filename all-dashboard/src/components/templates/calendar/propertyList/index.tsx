import SearchInput from "src/ui/search";
import List from "./list";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPropertyList } from "store/slices/calendar/propertyList";
import { useEffect, useState } from "react";

export default function BookingList() {
  const dispatch = useDispatch();
  const propertyList = useSelector(
    (state: any) => state.propertylist.propertyList
  );
  const selectedProperty = useSelector(
    (state: any) => state.propertylist.selectedProperty
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    if(propertyList && propertyList.length){
     dispatch(setSelectedPropertyList(propertyList[0]))
    }
  }, [propertyList]);
  

  const renderPropertyList = () => {
    return (
      <>
        {propertyList?.map((property: any, index: number) => (
          ((search && property?.title) ? property.title.includes(search) : true) ?
          <div
            onClick={() => dispatch(setSelectedPropertyList(property))}
            key={index}
          >
            <List
              property={property}
              selected={
                Object.keys(selectedProperty).length > 0 &&
                selectedProperty.customId == property.customId
                  ? true
                  : false
              }
            />
          </div> : ''
        ))}
      </>
    );
  };

  return (
    <div className="max-w-[360px] h-[100%] max-h-[700px] flex flex-col">
      <SearchInput onChange={(v: any) => setSearch(v)} />
      <div className="border border-[#D9D9D9] rounded-2xl flex flex-col gap-2 flex-1 mt-[16px] pt-[16px] pl-[16px] pr-[16px] scrollbar overflow-y-scroll">
        {propertyList?.length > 0 ? (
          renderPropertyList()
        ) : (
          <div>No Properties available.</div>
        )}
      </div>
    </div>
  );
}
