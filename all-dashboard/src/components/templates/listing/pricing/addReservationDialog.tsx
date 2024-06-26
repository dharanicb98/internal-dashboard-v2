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
import Counter from "ui/input/counter";

export default function AddReservationDialog(props: AddAddonsDialogProps) {
  const { open, onClose, extraServiceIndex } = props;
  const listingdetails = useListingDetailsSelector();
  const resetFormdata = {
    start_date: null,
    end_date: null,
    min_days: 0,
    max_days: listingdetails?.max_bookings_days || 0,
  };

  const addonsDropdown = useSelector((s: any) => s.addons) || [];
  const [selectedBasis, setSelectedBasis] = React.useState("day");
  const [servieName, setServiceName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [formData, setFormData] = React.useState({ ...resetFormdata });

  const selectedBasisKey = basis.find(
    (item) => item.value === selectedBasis
  )?.key;

  React.useEffect(() => {
    const selectedService = listingdetails?.long_term_discount[extraServiceIndex] || {};
    // const selectedService = {}
    if (open == "edit") {
      setFormData(selectedService);
    } else {
      setFormData({ ...resetFormdata });
    }
  }, [extraServiceIndex]);

  const validateExtraServiceData = (data) => {
    if (!data.start_date) return false;
    if (!data.end_date) return false;

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
            basePrice={formData.discount_amount}
            weekendPrice={formData.discount_amount}
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
          <div className="mt-0 min-w-[300px]">
            <div className="flex items-center justify-between py-4">
              <p className="shrink-0">Min Days</p>
              <Counter
                count={formData.min_days}
                incrementHandler={() =>
                  setFormData({ ...formData, min_days: formData.min_days + 1 })
                }
                decrementHandler={() => {
                  if (formData.min_days > 0) {
                    setFormData({ ...formData, min_days: formData.min_days - 1 })
                  }
                }}
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between py-4">
              <p className="shrink-0">Max Days</p>
              <Counter
                count={formData.max_days}
                incrementHandler={() =>
                  setFormData({ ...formData, max_days: formData.max_days + 1 })
                }
                decrementHandler={() => {
                  if (formData.max_days > 0) {
                    setFormData({ ...formData, max_days: formData.max_days - 1 })
                  }
                }}
              />
            </div>
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
                const selectedService = listingdetails?.long_term_discount[extraServiceIndex];
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
