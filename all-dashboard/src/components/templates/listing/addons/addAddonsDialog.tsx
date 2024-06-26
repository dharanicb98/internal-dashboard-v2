import Dialog from "ui/dialog";
import Divider from "ui/divider";
import EditableTextField from "ui/input/editableTextfield";
import ArrowDownIcon from "assets/icons/arrow-down.png";
import Image from "next/image";
import Select from "ui/input/select";
import { basis, discount } from "src/constants/basis";
import React from "react";
import { FilledButton } from "ui/buttons";
import TransparentInput from "ui/input/transparentInput";
import { useListingDetailsSelector } from "store/selectors/listing";
import { useSelector } from "react-redux";
import ToggleGroup from "ui/input/toggleGroup";
import PriceInput from "../pricing/priceInput";
import Calendar from "ui/calendar";
import CloseIcon from "assets/icons/close-rounded.svg";
export default function AddAddonsDialog(props: AddAddonsDialogProps) {
  const { open, onClose, extraServiceIndex } = props;
  const resetFormdata = {
    start_date: null,
    end_date: null,
    id: '',
    blocks: [],
    amount: 0,
    amount_type: 'flat',
    per_night: false,
    per_guest: false,
    per_bedroom: false,
  };
  const addonsDropdown = useSelector((s: any) => s.addons) || [];
  const listingdetails = useListingDetailsSelector();
  const [selectedBasis, setSelectedBasis] = React.useState("day");
  const [servieName, setServiceName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [formData, setFormData] = React.useState({ ...resetFormdata });
  const selectedBasisKey = basis.find(
    (item) => item.value === selectedBasis
  )?.key;

  console.log("cur extraServiceIndex====>",extraServiceIndex);
  console.log("addonsDropdown=====>",addonsDropdown);
  console.log("selectedFormData===>",formData);

  React.useEffect(() => {
      console.log("<== add dialog popup useEffect triggered ==>")
      const selectedService = listingdetails?.add_ons[extraServiceIndex] || {};
      console.log("selectedService==>",selectedService);
      
      if (open == "edit") {
        console.log("edit condition triggered");
        setFormData({...selectedService});
      } else if (open == "addBlock"){
        console.log("addBlock condition triggered");
        setFormData({...resetFormdata,id:selectedService.id});
      }else if (open === "editBlock"){
        console.log("edidBlock triggered");
        const selectedBlock = listingdetails?.add_ons[extraServiceIndex.id]?.blocks.filter((eachBlock:any)=>eachBlock._id === extraServiceIndex.sub_id)
        console.log("selectedBlock==========>",selectedBlock);
        setFormData(selectedBlock[0]);
      }else {
        setFormData({ ...resetFormdata });
      }
  },[extraServiceIndex,open]);

  const validateExtraServiceData = (data) => {
    if (!data.amount) return false;
    if (!data.id) return false;
    return true;
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="bg-white p-6 md:p-4 rounded-2xl flex md:flex-col">
        <div>
          {(open === "addBlock" || open === "editBlock") && <Calendar
            startDate={formData.start_date}
            endDate={formData.end_date}
            setEndDate={(value) => setFormData((pr: any) => ({ ...pr, end_date: value }))}
            setStartDate={(value) => setFormData((pr: any) => ({ ...pr, start_date: value }))}
            daySize={60}
            numberOfMonths={1}
            basePrice={formData.amount}
            weekendPrice={formData.amount}
            currencySymbol={
              listingdetails.hasOwnProperty("currency_symbol")
                ? listingdetails.currency_symbol
                : "$"
            }
          />}
        </div>
        <div>
            <Image
              src={CloseIcon}
              alt="close"
              width={26}
              height={26}
              className="cursor-pointer md:!w-6 md:!h-6 text-primary underline ml-auto flex"
              onClick={onClose}
            />
          <div className="mt-0">
            <p>Addons</p>
            <Select
              containerClass={(open == "edit"||open == "addBlock" || open ==="editBlock") ? "pointer-events-none" : ''}
              buttonContent={
                <div className="flex justify-between items-center border border-grey p-2 rounded-lg">
                  <p>{addonsDropdown.find(v => v.id == formData.id)?.name || 'Select'}</p>
                  <Image src={ArrowDownIcon} alt="down" />
                </div>
              }
              listPaperClass="w-full bg-[#eee] mt-0"
              optionsClass='m-0 border-b'
              onChange={(value: string) => setFormData({ ...formData, id: value })}
              options={addonsDropdown.map(e => { return { key: e.name, value: e.id } })}
            />
          </div>
          <div className="mt-5">
            <p>Amount Type</p>
            <Select
              buttonContent={
                <div className="flex justify-between items-center border border-grey p-2 rounded-lg">
                  <p>{discount.find(v => v.value == formData.amount_type)?.key || 'Select'}</p>
                  <Image src={ArrowDownIcon} alt="down" />
                </div>
              }
              listPaperClass="w-full bg-[#eee] mt-0"
              optionsClass='m-0 border-b'
              onChange={(value: string) => setFormData({ ...formData, amount_type: value })}
              options={discount}
            />
          </div>
          <div className="mt-5">
            <PriceInput
              title="Price"
              value={formData.amount}
              onChange={(value) => setFormData({ ...formData, amount: value })}
            />
          </div>
          <div className="mt-5">
            <ToggleGroup
              checked={formData.per_guest}
              handleChange={(e) => setFormData({ ...formData, per_guest: e })}
              title="Per Guest"
            />
          </div>
          <div className="mt-5">
            <ToggleGroup
              checked={formData.per_night}
              handleChange={(e) => setFormData({ ...formData, per_night: e })}
              title="Per Night"
            />
          </div>
          <div className="mt-5">
            <ToggleGroup
              checked={formData.per_bedroom}
              handleChange={(e) => setFormData({ ...formData, per_bedroom: e })}
              title="Per Bedroom"
            />
          </div>
          {(open == "add" || open === "addBlock") && (
            <FilledButton
              text="Add"
              buttonClass="w-full mt-6"
              onClick={() => {
                const data = {
                  ...formData
                };
                if (validateExtraServiceData(data)) {
                  onClose(data, open);
                  setFormData({ ...resetFormdata });
                }
              }}
            />
          )}
          {(open == "edit" || open === "editBlock") && (
            <FilledButton
              text="Update"
              buttonClass="w-full mt-6"
              onClick={() => {
                let data;
                if (open === "editBlock"){
                  const selectedBlock = listingdetails?.add_ons[extraServiceIndex.id]?.blocks.filter((eachBlock:any)=>eachBlock._id === extraServiceIndex.sub_id);
                  data = {
                    ...selectedBlock[0],
                    ...formData
                  };
                }else{
                  const selectedService = listingdetails?.add_ons[extraServiceIndex];
                  data = {
                  ...selectedService,
                  ...formData
                  };
                }
               
                if (validateExtraServiceData(data)) {
                  onClose(data, open);
                }
              }}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
}
interface AddAddonsDialogProps {
  open: boolean|string|any;
  onClose: VoidFunction;
  extraServiceIndex: any;
}