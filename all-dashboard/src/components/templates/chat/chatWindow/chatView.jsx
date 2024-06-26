import Image from "next/image";
import moment from "moment";
import { FilledButton } from "ui/buttons";
import InfoOutlinedIcon from "assets/icons/info-outlined.svg";
import CheckRoundedIcon from "assets/icons/check-rounded.svg";
import Link from "next/link";
import {
  useCurrentChatSelector,
  useMessageListSelector,
} from "store/selectors/chat";
import { useUserDetailsSelector } from "store/selectors/user";
import updateMessageBooking from "services/chat/updateMessageBooking";
import { useDispatch } from "react-redux";
import { updateMessageList } from "slices/chat";
import TickIcon from "assets/icons/tick.svg";
import DeliveredIcon from "assets/icons/delivered.svg";

export default function ChatView(props) {
  const {
    content,
    contentType,
    contentUrl,
    isUserMessage,
    senderId,
    timestamp,
    messageStatus,
    fileName,
    bookingStatus,
    _id: messageId,
    conversationId,
  } = props;
  const currentChat = useCurrentChatSelector();
  const userDetails = useUserDetailsSelector();
  const dispatch = useDispatch();
  const messageList = useMessageListSelector();

  const containerCss = `${senderId == userDetails?.userId ? "bg-black text-white  " : "border border-[#5C5C5C] "} overflow-hidden`;
  const timeStampCss = `${senderId == userDetails?.userId ? 'text-white' :  'text-[#000000]'}`

  const status = {
    Read: <Image src={DeliveredIcon} alt="read" width={12} height={7} />,
    Sent: <Image src={TickIcon} alt="sent" width={12} height={7} />,
  };

  if (bookingStatus !== "notavailable") {
    const startDate = moment(currentChat?.latestOpenOrder?.startDate);
    const endDate = moment(currentChat?.latestOpenOrder?.endDate);
    const getDatesRange = (start, end) => {
      const isSameMonth = start.format("M") === end.format("M");
      return `${start.format("MMM D")}-${end.format( isSameMonth ? "D" : "MMM D")}`;
    };

    const updateBookingRequest = async (value) => {
      const filteredChat = messageList.filter((item) => item._id !== messageId);
      await updateMessageBooking({
        conversationId,
        messageId,
        bookingStatus: value,
      });
      dispatch(updateMessageList(filteredChat));
    };

    switch (bookingStatus) {
      case "requested":
        return (
          <div className="bg-blue-light p-6 rounded-2xl">
            <p className="tracking-[0.7px] text-xl font-medium md:text-base">
              Booking request from {currentChat?.currentUser?.name}
            </p>
            {/* @TODO:Update Currency */}
            <p className="text-3xl font-medium mt-4">{`$${props.price}`}</p>
            <p className="text-grey-dark mt-2.5 font-medium md:text-sm">
              {currentChat?.latestOpenOrder?.propertyName}
            </p>
            <div className="flex items-center text-grey-dark mt-2">
              <p>{getDatesRange(startDate, endDate)}</p>
              <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="">
                {currentChat?.latestOpenOrder?.guests?.length} Guests
              </p>
              {/* @TODO:Check if pets */}
              {/* <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="">1 Pet</p> */}
              <Link
                className="text-primary ml-2"
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing`}
              >
                View
              </Link>
            </div>
            <p className="px-6 py-2.5 bg-white border border-grey mt-2.5 rounded-2xl text-grey-dark">
              {content}
            </p>
            <div className="flex mt-8 gap-4">
              <FilledButton
                buttonClass="bg-white border border-black !text-black px-[29px] py-[13px]"
                text="Decline"
                onClick={() => updateBookingRequest("declined")}
              />
              <FilledButton
                buttonClass="px-[29px] py-[13px]"
                text="Accept"
                onClick={() => updateBookingRequest("accepted")}
              />
            </div>
          </div>
        );
      case "accepted":
        return (
          <div className="bg-blue-light p-6 rounded-2xl">
            <p className="tracking-[0.7px] text-xl font-medium md:text-base">
              Booking request from {currentChat?.currentUser?.name}
            </p>
            <p className="text-3xl font-medium mt-4">{`$${props.price}`}</p>
            <p className="text-grey-dark mt-2.5 font-medium md:text-sm">
              {currentChat?.latestOpenOrder?.propertyName}
            </p>
            <div className="flex items-center text-grey-dark mt-2">
              <p>{getDatesRange(startDate, endDate)}</p>
              <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="">
                {currentChat?.latestOpenOrder?.guests?.length} Guests
              </p>
              {/* @TODO:Check if pets */}
              {/* <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="">1 Pet</p> */}
              <Link
                className="text-primary ml-2"
                href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/listing`}
              >
                View
              </Link>
            </div>
            <p className="px-6 py-2.5 bg-white border border-grey mt-2.5 rounded-2xl text-grey-dark">
              {content}
            </p>
            <div className="flex mt-8 gap-4 w-full justify-between items-center">
              <FilledButton buttonClass="px-[29px] py-[13px]" text="Accepted" />
              <button className="flex gap-1 items-center text-grey-dark ">
                <p>Unpaid</p>
                <Image
                  src={InfoOutlinedIcon}
                  alt="info"
                  width={16}
                  height={16}
                  className="grayscale"
                />
              </button>
            </div>
          </div>
        );
      case "paid":
        return (
          <div className="bg-white border border-grey p-6 rounded-2xl">
            <p className=" font-medium">
              Booking request from {currentChat?.currentUser?.name}
            </p>
            <p className="text-3xl font-medium mt-4">{`$${props.price}`}</p>
            <p className="text-grey-dark mt-2.5 font-medium text-sm">
              {currentChat?.latestOpenOrder?.propertyName}
            </p>
            <div className="flex items-center text-grey-dark mt-2">
              <p>{getDatesRange(startDate, endDate)}</p>
              <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="">
                {currentChat?.latestOpenOrder?.guests?.length} Guests
              </p>
              {/* <div className="colored-circle h-0.5 w-0.5 bg-grey-dark my-auto mx-1" />
              <p className="">1 Pet</p> */}
            </div>
            <div className="flex items-center font-medium text-grey-dark mt-2">
              <p>Reservation Id -</p>
              <p className="text-primary ml-0.5">
                {currentChat?.latestOpenOrder?.ReservationCode}
              </p>
            </div>
            <div className="flex mt-8 gap-4 w-full justify-between items-center">
              <button className="flex gap-1 items-center text-grey-dark ">
                <p>Booked</p>
                <Image
                  src={CheckRoundedIcon}
                  alt="info"
                  width={16}
                  height={16}
                  className="invert"
                />
              </button>
              <Link className="text-primary" href="/accounts/reservation">
                View
              </Link>
            </div>
          </div>
        );
      default:
        break;
    }
  }

  switch (contentType) {
    case "text":
      return (
        <div  className={`py-2 px-4 flex items-center rounded-lg gap-2 text-base leading-5 font-normal ${containerCss}`}>
          <p className="[overflow-wrap:anywhere]">{content}</p>
          <div className="flex items-center self-end gap-x-1">
            <span className={`leading-3 text-[10px] font-light ${timeStampCss}`}>{moment(timestamp).format("LT")}</span>
            {senderId == userDetails?.userId ? <span className={senderId == userDetails?.userId ? 'invert' : undefined}>{status[messageStatus]}</span>:''}
          </div>
        </div>
      );

    case "image":
      return (
        <div className={`${containerCss} rounded-xl`}>
          <Image src={contentUrl} alt="image" fill className="!static" onError={console.log}/>
        </div>
      );

    case "document":
      return (
        <div
          className={`${containerCss} rounded-xl flex items-center gap-3 p-2`}
        >
          <span className="material-icons-outlined ">description</span>
          <p>{fileName}</p>
          <button
            onClick={() => window.open(contentUrl, "_blank")}
            className="flex items-center"
          >
            <span className="material-icons-outlined">file_download</span>
          </button>
        </div>
      );
    default:
      return <></>;
  }
}
