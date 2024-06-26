interface ListProps {
  selected: boolean;
  property: object;
}

export default function List({ selected, property }: ListProps) {
  return (
    <div
      className={`flex flex-row w-[100%] h-[90px] rounded-2xl p-[12px] ${
        selected
          ? "bg-black text-white hover:bg-black"
          : "bg-white text-black hover:bg-gray-200"
      } cursor-pointer`}
    >
      <div
        className={`w-[60px] h-[60px] rounded-xl border-l-4 roundex-xl`}
        style={{ borderColor: property?.property_color }}
      >
        <img
          src={process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN + property?.image_path}
          alt="property"
          className="w-[60px] h-[60px] border rounded-xl object-fill"
        />
      </div>
      <div className="flex-1 ml-[6px] h-[60px] text-sm ">
        {property?.title}
      </div>
    </div>
  );
}
