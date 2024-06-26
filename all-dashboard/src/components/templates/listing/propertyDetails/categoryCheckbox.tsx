import React from "react";

import Image from "next/image";
import Checkbox from "ui/input/checkbox";
export default function CategoryCheckbox(props: CategoryCheckboxProps) {
  const { icon, title, isChecked, handleCheck,className  } = props;
  return (
    <div
      className={`border  rounded-2xl cursor-pointer w-30 h-30 relative flex flex-col items-center justify-center  
       ${isChecked ? 'border-black' : 'border-grey'}
      ${className}`}
      onClick={() => handleCheck(!isChecked)}
    >
      <div
        className="absolute top-4 right-4 flex"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox isChecked={isChecked} handleChange={() => {}} />
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* <Image
          src={icon}
          alt="icon"
          width={43}
          height={43}
          className="m-auto object-none"
        /> */}
         <img 
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxnpVUzgyyp7rmUxx5fgb0F7xnq1PGL4eVw&usqp=CAU'
              alt={title}
              width={96}
              height={96}
              className="w-9 h-9 !md:w-11 !md:h-11"
              />
        <p className="font-medium text-[14px]">{title}</p>
      </div>
    </div>
  );
}
interface CategoryCheckboxProps {
  icon: string;
  title: string;
  isChecked: boolean;
  handleCheck: (state: boolean) => void;
  className?: string;
}
