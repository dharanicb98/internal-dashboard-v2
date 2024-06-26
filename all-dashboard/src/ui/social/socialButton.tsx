import Image from "next/image";

type SocialButtonProps = {
  icon: string;
  name: string;
  title: string;
};

const SocialButton = (props: SocialButtonProps) => {
  return (
    <div className="flex h-16 cursor-pointer md:bg-white md:p-2 md:rounded-2xl">
      <div className="flex items-center justify-center py-6 px-5 border rounded-xl mr-4">
        <Image
          src={props.icon}
          alt={`${props.name} icon`}
          className="w-8 h-8 object-contain "
        />
      </div>

      <div className="border rounded-xl p-3 flex-1 flex items-center justify-between">
        <div>
          <span className="text-grey-light">{props.name}</span>
          <h1 className="font-medium mt-0.5">{props.title}</h1>
        </div>
        <button className="text-lg">Connect</button>
      </div>
    </div>
  );
};

export default SocialButton;
