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
import FilledInput from "ui/input/filledInput";
import CloseIcon from "assets/icons/close-rounded.svg";

export default function AddExtraServiceDialog(props: AddAddonsDialogProps) {
  const { open, onClose, extraServiceIndex } = props;
  const resetFormdata = {
    start_date: null,
    end_date: null,
    name: '',
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

  React.useEffect(() => {
    const selectedService = listingdetails?.extra_services[extraServiceIndex] || {};
    // const selectedService = {}
    if (open == "edit") {
      setFormData(selectedService);
    } else {
      setFormData({ ...resetFormdata });
    }
  }, [extraServiceIndex]);

  const validateExtraServiceData = (data) => {
    if (!data.amount) return false;
    if (!data.name) return false;

    return true;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="bg-white p-6 md:p-4 rounded-2xl flex md:flex-col">
        <div>
          <Calendar
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
          />
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
            <p>Service</p>
            <FilledInput
              title="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

          {open == "add" && (
            <FilledButton
              text="Add"
              buttonClass="w-full mt-6"
              onClick={() => {
                const data = {
                  ...formData
                };
                if (validateExtraServiceData(data)) {
                  onClose(data, "add");
                  setFormData({ ...resetFormdata });
                }
              }}
            />
          )}
          {open == "edit" && (
            <FilledButton
              text="Update"
              buttonClass="w-full mt-6"
              onClick={() => {
                const selectedService = listingdetails?.extra_services[extraServiceIndex];
                const data = {
                  ...selectedService,
                  ...formData
                };
                if (validateExtraServiceData(data)) {
                  onClose(data, "edit");
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
  open: boolean;
  onClose: VoidFunction;
}
