import Image from "next/image";
import RightArrowBlack from "assets/icons/RightArrowBlack.svg";

function ProfileTabLayout(props) {
  const { list } = props;
  return (
    <div>
      {list.map((item) => (
        <div
          className="flex items-center justify-between cursor-pointer py-3 px-1 border-b border-b-grey last:border-b-0"
          onClick={item.handler}
          key={item.name}
        >
          <p className="text-lg">{item.name}</p>
          <Image src={RightArrowBlack} alt="right" />
        </div>
      ))}
    </div>
  );
}

export default ProfileTabLayout;
