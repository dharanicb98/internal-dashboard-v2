function TaxCard({ title, subtitle, onClick }) {
  return (
    <div className="py-8 md:py-0 px-4 md:px-0 max-w-[560px] border border-[#5C5C5C] md:border-0 rounded-2xl flex gap-8 md:gap-6 md:flex-col">
      <div>
        <p className="text-lg font-medium"> {title}</p>
        <p className="text-base font-normal text-[#6B6B6B]">{subtitle}</p>
      </div>
      <div className="flex items-end">
        <button
          className="px-6 py-2.5 text-[#FFF] bg-[#000000] rounded-3xl min-w-[153px] md:text-sm"
          onClick={onClick}
        >
          Add Taxpayer
        </button>
      </div>
    </div>
  );
}

export default TaxCard;
