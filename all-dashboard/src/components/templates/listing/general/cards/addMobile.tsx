import AddImage from "assets/images/add.png";
import Image from "next/image";

export default function AddMobileCard(props: AddCardProps) {
  const { title, onClick } = props;
  return (
    <button
      className={`border-solid border border-grey-dark px-4 py-2.5 rounded-2xl`}
      onClick={onClick}
    >
      <p className="ellipsis text-lg">{title}</p>
      <Image src={AddImage} alt="add" className="md:w-11 md:h-11" />
    </button>
  );
}

interface AddCardProps {
  title: string;
  onClick: VoidFunction;
  containerClass?: string;
}
