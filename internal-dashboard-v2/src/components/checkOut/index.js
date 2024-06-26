import { useState } from "react";


const Container = ({ name, imgUrl }) => {
  const [checked, setCheck] = useState(false);

  const handleChange = (event) => {
    setCheck(event.target.checked);
    // console.log(event.target.checked);
  };

  return (
    <li
      className="border-[2px] rounded-md border-[#bbb7b7] m-5 flex justify-between w-[20%]"
      onClick={() => setCheck(!checked)}
    >
      <div className="flex flex-col justify-center items-center">
        <img src={imgUrl} alt={name} />
        <p>{name}</p>
      </div>
      <div className="m-2">
        <input type={`checkbox`} onChange={handleChange} checked={checked} className={"rounded-checkbox"} />
      </div>
    </li>
  );
};

export default Container;

