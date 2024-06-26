import React from "react";

export default function Dialog(props: DialogProps) {
  const { open = false, onClose, children, backDropClass = "", contentClass = ""} = props;

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
    return () => {
      document.body.style.overflow = "inherit";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed  h-full w-full top-0 left-0 dialog__index bg-grey-light bg-opacity-50 flex items-center justify-center ${backDropClass}`}
      onClick={onClose}>

      <div className={`dialogContent__index overflow-auto no-scrollbar max-h-[calc(100vh-50px)] ${contentClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface DialogProps {
  position?: "left" | "right" | "bottom";
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentClass?: string;
  backDropClass?: string;
}
