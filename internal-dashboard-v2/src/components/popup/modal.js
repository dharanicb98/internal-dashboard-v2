import React from "react";

// const Backdrop = (props) => {
//   return <div onClick={props.hideForm} className={`backdrop`}></div>;
// };

// const ModalOverlay = (props) => {
//   return (
//     <div className={`modal`}>
//       <div className={`content`}>{props.children}</div>
//     </div>
//   );
// }

const Modal = (props) => {
  // console.log(props)
  return (
    <>
      {/* <Backdrop hideForm={props.hideForm} />, */}
      <div onClick={props.hideForm} className={`backdrop `}></div>
      
      <div className={`modal   bg-white py-8 px-4  ${props.className}`}>
        <h2 className="text-2xl text-center text-red-500">{props.title}</h2>
        <div className={`content  w-full max-h-[50vh] scrollbar-hide overflow-y-auto`}>
          {props.children}
        </div>
      </div>
    </>
  );
}
export default Modal;








