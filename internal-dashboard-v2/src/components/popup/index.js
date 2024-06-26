import React, { useState } from "react";
import CommonPopup from "./commonPopup";
// import List from "./List";

const MainPopup = () => {
  const [isShown, setIsShown] = useState(false);
  const hideForm = () => setIsShown(false);
  const showForm = () => setIsShown(true);
  const [listData, setListData] = useState([]);
  return (
    <div>
      <button onClick={showForm} className="bg-rose-500 p-2 float-right">
        Create
      </button>
      {isShown && <CommonPopup hideForm={hideForm} setListData={setListData} />}
      {/* <List list={listData} /> */}
    </div>
  );
};

export default MainPopup;
