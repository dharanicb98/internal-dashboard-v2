import NeedHelpCard from "../common/needHelpCard";
import TaxCard from "../common/taxcard";
const TaxPayer = ({ taxPage, setTaxPage }) => {
  return (
    <div className="flex gap-4 justify-between flex-wrap">
      <div className="flex flex-col gap-8">
        <div>
          <TaxCard
            title={"Add Taxpayer Information"}
            subtitle={"Tax info is requires for most countries /regions"}
            onClick={() => setTaxPage("taxdetails")}
          />
        </div>
        <div>
          <TaxCard
            title={"Value Added Tax (VAT)"}
            subtitle={"Tax info is requires for most countries /regions"}
            onClick={() => setTaxPage("vatdetails")}
          />
        </div>
      </div>
      <div>
        <NeedHelpCard />
      </div>
    </div>
  );
};

export default TaxPayer;
