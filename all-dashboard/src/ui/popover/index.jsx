import React from "react";

const PopOver = ({
  children,
  openDialog,
  setOpenDialog,
  containerClass = "",
}) => {
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    if (openDialog) {
      document.body.style.overflow = "hidden";
    }

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDialog((prev) => !prev);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return openDialog ? (
    <div
      ref={wrapperRef}
      className={`dialog__index absolute ${containerClass}`}
    >
      {children}
    </div>
  ) : null;
};

export default PopOver;
