import React from "react";
import Image from "next/image";
import { FilledButton, OutlinedButton } from "ui/buttons";
import CloseRoundedIcon from "assets/icons/close-rounded.svg";
import Textarea from "ui/input/textarea";
import { generateSampleArray } from "utils/common/index";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import CalendarIcon from "assets/icons/calendar-outline.svg";
import CheckRounded from "assets/icons/check-rounded-primary.svg";
import { useScheduleMessageListSelector } from "store/selectors/chat";
import deleteScheduleMessage from "services/chat/scheduleMessage/deleteScheduleMessage";
import { useDispatch } from "react-redux";
import { updateScheduleMessageList } from "slices/chat";
import { useScheduleMessageTemplatesSelector } from "store/selectors/chat";
import updateScheduleMessage from "services/chat/scheduleMessage/updateScheduleMessage";
import createScheduleMessage from "services/chat/scheduleMessage/createScheduleMessage";
import { useUserDetailsSelector } from "store/selectors/user";

const TimingSelector = (props) => {
  const { value, onChange } = props;
  return (
    <>
      {generateSampleArray(24).map((item) => (
        <div
          className={`px-8 py-9 text-center border  rounded-2xl cursor-pointer select-none ${
            value === item + 1 ? "border-black" : "border-grey"
          }`}
          key={item}
          onClick={() => onChange(item + 1)}
        >
          <p className="text-grey-dark text-lg leading-6">Hour</p>
          <p className="text-3xl font-medium leading-6 mt-8">{item + 1}</p>
        </div>
      ))}
    </>
  );
};

const MessageList = (props) => {
  const { value, onChange } = props;

  const templates = useScheduleMessageTemplatesSelector();

  return (
    <div>
      {templates.map((item) => (
        <div
          className={`flex border mb-2 border-grey rounded-lg cursor-pointer px-4 py-5 ${
            item._id === value ? "!border-black" : ""
          }`}
          key={item._id}
          onClick={() => onChange(item._id)}
        >
          <Image
            src={CalendarIcon}
            alt="calendar"
            width={20}
            height={24}
            className="shrink-0 w-5 h-6 mr-2 "
          />
          <div className="mr-auto">
            <p className="font-medium text-sm">{item.action}</p>
            <p className="text-grey-dark mt-3 text-sm">{item.details}</p>
          </div>
          <input
            type="radio"
            name="schedule-time"
            className=" focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={item._id === value}
          />
        </div>
      ))}
    </div>
  );
};

const ScheduleList = (props) => {
  const { onEdit } = props;
  const list = useScheduleMessageListSelector();
  const templates = useScheduleMessageTemplatesSelector();
  const dispatch = useDispatch();
  const userDetails = useUserDetailsSelector();

  const handleDelete = async (id) => {
    const params = userDetails?.isHost
      ? {
          hostId: userDetails?.userId,
          messageId: id,
        }
      : {
          userId: userDetails?.userId,
          messageId: id,
        };
    const filteredData = list.filter((item) => item._id !== id);
    dispatch(updateScheduleMessageList(filteredData));
    await deleteScheduleMessage(params);
  };

  return (
    <>
      <Image
        src={CheckRounded}
        alt="check"
        width={60}
        height={60}
        className="text-primary mx-auto "
      />
      <p className="mt-4 mb-10 text-center text-2xl ">
        Your Scheduled Messages
      </p>

      <div className="bg-white border border-grey rounded-3xl p-6 ">
        <p className="pb-4 border-b border-b-grey">Active Scheduled Messages</p>
        <div className="flex flex-col">
          {list.map((item, idx) => (
            <div
              className="dui-join dui-join-vertical border-b border-b-grey last:border-b-0 rounded-none max-w-[615px] md:max-w-[68vw]"
              key={idx}
            >
              <div className="dui-collapse dui-collapse-arrow dui-join-item truncate">
                <input type="checkbox" className="w-full" />
                <div className="dui-collapse-title pl-0 flex items-center truncate ">
                  <p className="text-lg font-medium shrink-0 md:texts-sm">{`${item.hour} hours`}</p>
                  <div className="colored-circle h-1.5 w-1.5 bg-grey-dark my-auto mx-2.5 shrink-0" />
                  <p className=" text-grey-dark shrink-0 md:texts-sm">
                    {
                      templates.find(
                        (tItem) => tItem._id === item.templatedetails._id
                      ).action
                    }
                  </p>
                  <div className="colored-circle h-1.5 w-1.5 bg-grey-dark my-auto mx-2.5 shrink-0" />
                  <p className="truncate text-grey-dark max-w-xs md:texts-sm md:max-w-full">
                    {item.message}
                  </p>
                </div>
                <div className="dui-collapse-content p-0 overflow-hidden whitespace-pre-wrap">
                  <p className="px-6 py-5 rounded-2xl border border-grey w-full text-grey-dark text-lg">
                    {item.message}
                  </p>
                  <div className="flex gap-2 mt-[18px]">
                    <p className="w-[75px] font-medium text-xl">Time</p>
                    <p className="text-grey-dark text-lg">{`${item.hour} hours`}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <p className="w-[75px] font-medium text-xl">Details</p>
                    <p className="text-grey-dark text-lg">
                      {
                        templates.find(
                          (tItem) => tItem._id === item.templatedetails._id
                        ).action
                      }
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6 justify-end">
                    <OutlinedButton
                      primary={false}
                      buttonClass="px-[31px] py-[13px]"
                      text="Edit"
                      onClick={() => onEdit(item)}
                    />
                    <FilledButton
                      buttonClass="px-[31px] py-[13px]"
                      text="Delete"
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ScheduleDetails = (props) => {
  const { details, handleChangeDetails, setShowScheduleMessageList, onClose } =
    props;
  const dispatch = useDispatch();
  const timerContainerRef = React.useRef(null);
  const userDetails = useUserDetailsSelector();
  const list = useScheduleMessageListSelector();

  const handleScheduleMessage = async () => {
    const params = userDetails?.isHost
      ? {
          hostId: userDetails?.userId,
        }
      : {
          userId: userDetails?.userId,
        };

    if (details.messageId) {
      await updateScheduleMessage({
        ...details,
        ...params,
      });
    } else {
      const data = await createScheduleMessage({
        message: details.message,
        templateId: details.templateId,
        hour: details.hour,
        ...params,
      });
      console.log([...list, data]);
      // dispatch(updateScheduleMessageList([...list, data]));
    }
    onClose();
  };

  // const handleScheduleMessage = async () => {
  //   const params = userDetails?.isHost
  //     ? {
  //         hostId: userDetails?.userId,
  //       }
  //     : {
  //         userId: userDetails?.userId,
  //       };

  //   if (details.messageId) {
  //     await updateScheduleMessage({
  //       ...details,
  //       ...params,
  //     });
  //     setShowScheduleMessageList(true);
  //   } else {
  //     await createScheduleMessage({
  //       message: details.message,
  //       templateId: details.templateId,
  //       hour: details.hour,
  //       ...params,
  //     });
  //     onClose();
  //   }
  // };

  return (
    <>
      <div className="flex gap-64 items-center my-4 md:flex-col-reverse md:gap-4 md:items-start">
        <p className="text-[24px] font-medium">Create New Schedule </p>
        <p
          className="underline text-primary cursor-pointer select-none md:-mt-9"
          onClick={() => {
            setShowScheduleMessageList(true);
          }}
        >
          scheduled messages
        </p>
      </div>
      <p className="text-grey-dark mb-8">
        Create New Schedule Customize it as you want it to be
      </p>
      <p className="mb-4 text-xl font-medium">Custom Message</p>
      <Textarea
        className="px-6 py-5 border-grey"
        row={3}
        value={details.message}
        onChange={(value) => handleChangeDetails("message", value)}
      />
      <div className="flex items-center justify-between mb-4 mt-8">
        <p className=" text-xl font-medium">Select timing</p>
        <div className="flex items-center gap-8">
          <Image
            src={ChevronLeftIcon}
            alt="left"
            width={8}
            height={15}
            className="cursor-pointer"
            onClick={() => {
              if (timerContainerRef.current) {
                timerContainerRef.current.scrollTo(
                  timerContainerRef.current.scrollLeft - 300,
                  0
                );
              }
            }}
          />
          <Image
            src={ChevronLeftIcon}
            alt="right"
            width={8}
            height={15}
            className="rotate-180 cursor-pointer"
            onClick={() => {
              if (timerContainerRef.current) {
                timerContainerRef.current.scrollTo(
                  timerContainerRef.current.scrollLeft + 300,
                  0
                );
              }
            }}
          />
        </div>
      </div>
      <div
        className="flex gap-[25px] w-[678px] overflow-auto scroll-smooth md:max-w-[80vw] md:pb-1"
        ref={timerContainerRef}
      >
        <TimingSelector
          value={+details.hour}
          onChange={(value) => handleChangeDetails("hour", `${value}`)}
        />
      </div>
      <p className="mb-4 mt-8 text-xl font-medium">Messages</p>
      <MessageList
        value={details.templateId}
        onChange={(value) => handleChangeDetails("templateId", value)}
      />
      <div className="flex justify-end gap-4 py-[34px] sticky bottom-0 bg-white md:bg-[#F7FEFF]">
        <OutlinedButton
          primary={false}
          buttonClass="px-[31px] py-[13px]"
          text="Cancel"
          onClick={() => onClose()}
        />
        <FilledButton
          buttonClass="px-[31px] py-[13px]"
          text="Schedule"
          onClick={handleScheduleMessage}
        />
      </div>
    </>
  );
};

export default function ScheduleDialog(props) {
  const { onClose } = props;

  const [details, setDetails] = React.useState({
    message: "",
    templateId: "",
    hour: "",
    messageId: "",
  });

  const [showScheduleMessageList, setShowScheduleMessageList] =
    React.useState(false);

  const handleChangeDetails = (key, value) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className={`p-12  rounded-2xl pb-0 md:px-6 md:mx-4 md:bg-[#F7FEFF] ${
        showScheduleMessageList ? "bg-[#F7F7F7] pb-8" : "bg-white"
      }`}
    >
      <Image
        src={CloseRoundedIcon}
        alt="close"
        className="cursor-pointer ml-auto"
        onClick={onClose}
      />
      {!!showScheduleMessageList ? (
        <ScheduleList
          details={details}
          handleChangeDetails={handleChangeDetails}
          onEdit={(item) => {
            setDetails((prev) => ({
              ...prev,
              message: item.message,
              templateId: item.templatedetails._id,
              hour: item.hour,
              messageId: item._id,
            }));
            setShowScheduleMessageList(false);
          }}
        />
      ) : (
        <ScheduleDetails
          details={details}
          handleChangeDetails={handleChangeDetails}
          setShowScheduleMessageList={setShowScheduleMessageList}
          onClose={onClose}
          showScheduleMessageList={showScheduleMessageList}
        />
      )}
    </div>
  );
}
