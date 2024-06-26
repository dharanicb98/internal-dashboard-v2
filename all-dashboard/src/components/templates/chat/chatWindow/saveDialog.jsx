import React from "react";
import Image from "next/image";
import AddRounded from "assets/icons/add-rounded.svg";
import CloseRounded from "assets/icons/close-rounded.svg";
import {
  useSavedMessageListSelector,
  useCurrentChatSelector,
} from "selectors/chat";
import { updateSavedMessageList } from "slices/chat";
import deleteSavedMessage from "services/chat/deleteSavedMessage";
import createSavedMessage from "services/chat/createSavedMessage";
import { generateUUID } from "utils/common";
import { useDispatch } from "react-redux";
import { useUserDetailsSelector } from "store/selectors/user";
import { emitMessage } from "utils/socket/emitters";

export default function SaveDialog(props) {
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const savedMessageList = useSavedMessageListSelector();
  const userDetails = useUserDetailsSelector();
  const [showAddMoreField, setShowAddMoreField] = React.useState(false);
  const currentChat = useCurrentChatSelector();

  const handleDeleteSavedMessage = async (value) => {
    const filteredList = savedMessageList.filter(
      (fItem) => fItem._id !== value._id
    );
    dispatch(updateSavedMessageList(filteredList));
    const params = userDetails?.isHost
      ? {
          hostId: userDetails?.userId,
          messageId: value._id,
        }
      : {
          userId: userDetails?.userId,
          messageId: value._id,
        };
    await deleteSavedMessage(params);
  };

  const handleCreateSavedMessage = async (value) => {
    const params = userDetails?.isHost
      ? {
          hostId: userDetails?.userId,
          message: value,
        }
      : {
          hostId: userDetails?.userId,
          message: value,
        };
    const data = await createSavedMessage(params);
    const filteredList = [...savedMessageList, data];

    dispatch(updateSavedMessageList(filteredList));
  };

  const sendSavedMessage = (message) => {
    emitMessage({
      senderId: userDetails.userId,
      content: message,
      contentType: "text",
      conversationId: currentChat._id,
    });
    onClose();
  };

  return (
    <div className="bg-white py-4 max-h-[350px] overflow-auto">
      <p className="text-lg font-medium leading-4 text-right">
        Whats Your Queries ?
      </p>
      <p className="text-grey-dark text-sm mt-2 leading-4 text-right mb-[26px]">
        This will be saved to every message
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-[26px] justify-end">
        {console.log("savedMessageList", savedMessageList)}
        {savedMessageList.map((item) => (
          <div
            key={item._id}
            className="flex px-3.5 py-2.5 gap-2.5 items-center bg-grey-950 rounded-lg text-sm leading-4 cursor-pointer"
            onClick={() => sendSavedMessage(item.message)}
          >
            <p>{item.message}</p>
            <Image
              src={CloseRounded}
              alt="close"
              width={20}
              height={20}
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteSavedMessage(item);
              }}
            />
          </div>
        ))}
      </div>
      <div className=" flex gap-x-4 mt-[26px] justify-end">
        {showAddMoreField && (
          <input
            placeholder="Type your text"
            className="border border-grey rounded-lg px-5 py-2 text-sm"
            onKeyUp={(event) => {
              if (event.key === "Enter" && event.target.value) {
                handleCreateSavedMessage(event.target.value);
                setShowAddMoreField(false);
              }
            }}
          />
        )}
        <div
          className="flex px-3.5 py-2.5 gap-2.5 items-center bg-grey-950 rounded-lg text-sm leading-4 cursor-pointer select-none"
          onClick={() => setShowAddMoreField(!showAddMoreField)}
        >
          <p>Add more</p>
          <Image src={AddRounded} alt="close" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
