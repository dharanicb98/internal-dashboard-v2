import { FilledButton } from "ui/buttons";
const TaxDocument = ({ taxPage, setTaxPage }) => {
  return (
    <div>
      <div className="mb-10">
        <p className="text-lg font-medium"> Tax Document</p>
        <p className="text-base font-normal text-[#6B6B6B]">
          Tax documents required for filing taxes are available to download and
          review here.
        </p>
        <p className="text-base font-normal text-[#6B6B6B]">
          You can also file taxes using detailed earnings info, available in the
          <b className="underline text-[#000] cursor-pointer">
            {" "}
            earning summary
          </b>{" "}
        </p>
      </div>
      <div className="flex justify-between mb-6 pb-4 border-b border-b-[#D9D9D()]">
        <div>
          <p className="text-lg font-medium"> 2022</p>
          <p className="text-base font-normal text-[#6B6B6B]">
            {" "}
            No tax Document issued
          </p>
        </div>
        <FilledButton
          text="Upload"
          onClick={() => {}}
          buttonClass="px-6 py-2.5 text-base font-normal"
        />
      </div>
      <div className="flex justify-between mb-6 pb-4 border-b border-b-[#D9D9D()]">
        <div>
          <p className="text-lg font-medium"> 2022</p>
          <p className="text-base font-normal text-[#6B6B6B]">
            {" "}
            No tax Document issued
          </p>
        </div>
        <FilledButton
          text="Upload"
          onClick={() => {}}
          buttonClass="px-6 py-2.5 text-base font-normal"
        />
      </div>
    </div>
  );
};

export default TaxDocument;
