import React from "react";
import StickyEvent from "./stickyEvent";
import ChatBox from "./chatBox";
import {
  useSavedMessageDlgSelector,
  useMessageListSelector,
  useCurrentChatSelector,
} from "store/selectors/chat";
import { useUserDetailsSelector } from "store/selectors/user";
import { toggleSavedMessageDlgVisibility } from "src/store/slices/chat";
import groupItemsByDate from "utils/common/groupItemsByDate";
import SaveDialog from "./saveDialog";
import { useDispatch } from "react-redux";

export default function ChatListContainer(props) {
  const dispatch = useDispatch();
  const messageList = useMessageListSelector();
  const showSavedMessages = useSavedMessageDlgSelector();

  const [showStickyEvent, setShowStickyEvent] = React.useState(true);

  const scrollContainerRef = React.useRef(null);

  const currentChat = useCurrentChatSelector();
  const userDetails = useUserDetailsSelector();

  const lastMessage = messageList?.[Number(messageList?.length || 1) - 1] || [];

  const groupedMessageList = groupItemsByDate(messageList || []);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, scrollContainerRef.current.scrollHeight);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [JSON.stringify(lastMessage)]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col gap-6 overflow-y-auto pr-3 pb-4 dark-scrollbar relative" ref={scrollContainerRef}>
        {!!(
          currentChat?.latestOpenOrder &&
          showStickyEvent &&
          userDetails.isHost
        ) && (
          <div className="sticky top-[10px] md:top-0 z-10">
            <StickyEvent  data={currentChat?.latestOpenOrder}  closeEventBar={() => setShowStickyEvent(false)}/>
          </div>
        )}

        {groupedMessageList.map((item) => (
          <div key={item.date} className="flex flex-col gap-[30px]">
            <p className="w-fit mx-auto text-[#6B6B6B] text-xs font-light leading-3">{item.date}</p>
            {item.list.map((nItem) => (
              <ChatBox {...nItem} key={nItem._id} />
            ))}
          </div>
        ))}
      </div>

      {showSavedMessages && (
        <div className="sticky bottom-0">
          <SaveDialog onClose={() => dispatch(toggleSavedMessageDlgVisibility(false))}/>
        </div>
      )}
    </div>
  );
}
