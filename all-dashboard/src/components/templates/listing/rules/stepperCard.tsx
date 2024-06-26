import Image from "next/image";

export default function StepperCard(props: StepperCardProps) {
  const { title, src, description } = props;
  return (
    <div className="overflow-hidden rounded-2xl border border-grey shrink-0 md:w-[180px]">
      <div className="relative h-72 md:h-44 ">
        <Image src={src} fill alt={title} />
      </div>
      <div className="px-4 py-6">
        <p className="text-xl font-medium">{title}</p>
        <p className="text-grey-light mt-3">{description}</p>
      </div>
    </div>
  );
}

interface StepperCardProps {
  src: string;
  title: string;
  description: string;
}
