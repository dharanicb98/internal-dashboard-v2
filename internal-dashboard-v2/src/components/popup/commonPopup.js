import React from "react";
import Modal from "./modal";

const CommonPopup = (props) => {
  // console.log("commonpopup", props)
  return (
    <Modal hideForm={props.hidePopup} className={props.className} title={props.title}>
        <div className="p-4 rounded-xl">
          {props.children}
        </div>
    </Modal>
  );
};

export default CommonPopup;
