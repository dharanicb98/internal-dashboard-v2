import AddImage from "assets/images/add.png";
import Image from "next/image";

export default function AddCard(props: AddCardProps) {
  const { title, description, onClick, containerClass = "" } = props;
  return (
    <div
      className={`p-2 flex-col gap-4 flex-center border border-grey-dark rounded-2xl select-none cursor-pointer ${containerClass}`}
      onClick={onClick}
    >
      <Image src={AddImage} alt="add" className="md:w-11 md:h-11" />
      <p className="font-medium whitespace-nowrap">{title}</p>
      {!!description && (
        <p className="text-grey-light text-[14px] text-center">{description}</p>
      )}
    </div>
  );
}

interface AddCardProps {
  title: string;
  description?: string;
  onClick: VoidFunction;
  containerClass?: string;
}
