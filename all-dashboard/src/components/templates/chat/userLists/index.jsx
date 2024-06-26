import React from "react";
import SearchInput from "ui/search";
import Image from "next/image";
import FilterIcon from "assets/icons/filter-3.svg";
import SortIcon from "assets/icons/sort.svg";
import { ChatContext } from "contexts/chat";
import UserCard from "./userCard";
import UserSkeleton from "./userSkeleton";
import { generateSampleArray } from "src/utils/common";
import {
  useChatUserListSelector,
  useChatUserListPageSelector,
  useChatSocketSelector,
  useChatIdSelector,
  useChatUserListSortSelector,
  useChatUserListFilterSelector,
  useChatUserListSearchSelector,
  useChatUserListTotalCountSelector,
} from "store/selectors/chat";
import Select from "ui/input/select";
import Popover from "ui/popover";
import Checkbox from "ui/input/checkbox";
import { FilledButton, OutlinedButton } from "ui/buttons";
import { useDispatch } from "react-redux";
import getConversationList from "src/services/chat/getConversationList";
import { useUserDetailsSelector } from "store/selectors/user";
import {
  updateUserList,
  updateUserListPage,
  updateChatId,
  setSocketEvents,
  updateUserListSort,
  updateUserListFilter,
  updateUserListSearch,
} from "slices/chat";
import useDebounce from "utils/hooks/useDebounce";
import debounce from "lodash/debounce";
import useIntersectionObserver from "utils/hooks/useIntersectionObserver";

const FilterDialog = (props) => {
  const { onClose } = props;
  const [currentFilter, setCurrentFilters] = React.useState([]);

  const dispatch = useDispatch();
  const userDetails = useUserDetailsSelector();
  const sort = useChatUserListSortSelector();
  const filter = useChatUserListFilterSelector();
  const search = useChatUserListSearchSelector();

  const handleApplyFilter = async () => {
    dispatch(updateUserListFilter(currentFilter));
    const role = userDetails.isHost ? "host" : "user";
    const conversationList = await getConversationList({
      role,
      id: userDetails.userId,
      page: 1,
      sort,
      filter: currentFilter,
      search,
    });
    onClose();
    dispatch(updateUserListPage(1));
    dispatch(updateUserList(conversationList.list || []));
  };

  const handleChangeFilters = async ( value ) => {
    if ( currentFilter.includes(value) ) {
      setCurrentFilters((prev) => prev.filter((item) => item !== value));
    } 
    else {
      setCurrentFilters((prev) => [...prev, value]);
    }
  };

  React.useEffect(() => {
    setCurrentFilters(filter);
  }, [filter]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg w-[363px]">
      <p className="text-xl font-medium mb-5">Filter message</p>
      <p className="text-grey-dark text-sm mb-3">Message type</p>
      <div className="grid grid-cols-2  mb-6">
        <div className="flex items-center gap-3">
          <Checkbox
            isChecked={currentFilter.includes("read_messages")}
            handleChange={() => handleChangeFilters("read_messages")}
            className="!rounded-md"
          />
          <p>Read messages</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            isChecked={currentFilter.includes("unread_messages")}
            handleChange={() => handleChangeFilters("unread_messages")}
            className="!rounded-md"
          />
          <p>Unread messages</p>
        </div>
      </div>
      <p className="text-grey-dark text-sm mb-3">Booking type</p>
      <div className="grid grid-cols-2 gap-y-5">
        <div className="flex items-center gap-3">
          <Checkbox
            isChecked={currentFilter.includes("enquiry")}
            handleChange={() => handleChangeFilters("enquiry")}
            className="!rounded-md"
          />
          <p>Enquiry</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            isChecked={currentFilter.includes("booking_request")}
            handleChange={() => handleChangeFilters("booking_request")}
            className="!rounded-md"
          />
          <p>Booking Request</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            isChecked={currentFilter.includes("bid_request")}
            handleChange={() => handleChangeFilters("bid_request")}
            className="!rounded-md"
          />
          <p>Bid Request</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            isChecked={currentFilter.includes("reservation")}
            handleChange={() => handleChangeFilters("reservation")}
            className="!rounded-md"
          />
          <p>Reservation</p>
        </div>
      </div>

      <div className="flex item-center gap-4 mt-6 justify-end">
        <OutlinedButton
          primary={false}
          text="Cancel"
          buttonClass="px-6 py-2"
          onClick={() => onClose()}
        />
        <FilledButton
          text="Apply"
          buttonClass="px-6 py-2"
          onClick={handleApplyFilter}
        />
      </div>
    </div>
  );
};

const SortDialog = (props) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const userDetails = useUserDetailsSelector();

  const sort = useChatUserListSortSelector();
  const filter = useChatUserListFilterSelector();
  const search = useChatUserListSearchSelector();

  const handleApplySort = async ( sortValue ) => {
    const role = userDetails.isHost ? "host" : "user";

    console.log( 'console sort', sort )

    if ( sort === sortValue ) {
      console.log('console sort', sort)
      console.log('console true')
    }
    else {
      console.log('console false')
    }
    //dispatch(updateUserListSort(sortValue));

    const conversationList = await getConversationList({
      role,
      id: userDetails.userId,
      sort: sortValue,
      page: 1,
      filter,
      search,
    });
    onClose();
    dispatch(updateUserListSort(sortValue))
    dispatch(updateUserListPage(1));
    // dispatch(updateUserList(conversationList.list || []));
  };



  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg w-[300px]">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xl font-medium">Sort</p>
        {/* <button className="underline">Clear</button> */}
      </div>
      <div className="flex flex-col gap-8">
        <div class="flex items-center gap-3">
          <input
            id="default-radio-1"
            type="radio"
            name="message-sort"
            className=" focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={sort === "booking_request"}
            onChange={() => handleApplySort("booking_request")}
          />
          <label for="default-radio-1">Booking requests</label>
        </div>
        <div class="flex items-center gap-3 ">
          <input
            id="default-radio-2"
            type="radio"
            name="message-sort"
            className=" focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={sort === "bid_request"}
            onChange={() => handleApplySort("bid_request")}
          />
          <label for="default-radio-2">Bid requests</label>
        </div>
        <div class="flex items-center gap-3">
          <input
            id="default-radio-3"
            type="radio"
            name="message-sort"
            className=" focus:ring-black text-black !accent-black w-6 h-6 focus:ring-0"
            checked={sort === "support"}
            onChange={() => handleApplySort("support")}
          />
          <label for="default-radio-3">Support</label>
        </div>
      </div>
    </div>
  );
};







export default function UserLists() {
  const userList = useChatUserListSelector();
  const [showFilterDialog, setShowFilterDialog] = React.useState(false);
  const [showSortDialog, setShowSortDialog] = React.useState(false);
  const dispatch = useDispatch();
  const searchValue = useChatUserListSearchSelector();
  const userDetails = useUserDetailsSelector();
  const sort = useChatUserListSortSelector();
  const filter = useChatUserListFilterSelector();
  const socketEvents = useChatSocketSelector();
  const search = useChatUserListSearchSelector();
  const totalCount = useChatUserListTotalCountSelector();
  const loadingRef = React.useRef(null);
  const chatId = useChatIdSelector();

  const entry = useIntersectionObserver(loadingRef, {});
  const isVisible = !!entry?.isIntersecting;
  const page = useChatUserListPageSelector();

  const debounceSearch = React.useCallback(
    debounce(async (value) => {
      const role = userDetails.isHost ? "host" : "user";
      const conversationList = await getConversationList({
        id: userDetails.userId,
        search: value,
        page: 1,
        sort,
        role,
        filter,
      });
      dispatch(updateUserListPage(1));
      dispatch(updateUserList(conversationList.list || []));
    }, 500),
    [sort, filter, userDetails]
  );

  const handleSearchChange = (value) => {
    dispatch(updateUserListSearch(value));
    debounceSearch(value);
  };

  React.useEffect(() => {
    if (socketEvents.name) {
      if (socketEvents.name == "reload_chat") {
        debounceSearch(searchValue);
      }
      if (socketEvents.name == "reload_blocked") {
        if (chatId == socketEvents.data) dispatch(updateChatId(""));
      }
      dispatch(setSocketEvents({ name: "" }));
    }
  }, [socketEvents]);

  React.useEffect(() => {
    const rowPerPage = 10;
    const totalPage = Math.ceil(totalCount / rowPerPage);
    const isPageExceeded = totalPage <= page;
    if (isVisible && !isPageExceeded) {
      (async () => {
        const role = userDetails.isHost ? "host" : "user";
        const newPage = page + 1;
        dispatch(updateUserListPage(newPage));
        const conversationList = await getConversationList({
          id: userDetails.userId,
          search,
          page: newPage,
          sort,
          role,
          filter,
        });
        dispatch(updateUserList(conversationList.list || []));
      })();
    }
  }, [isVisible]);

  return (
    <>
      <div className="h-full flex flex-col md:pt-10">
        <p className="hidden md:block text-3xl font-normal leading-10 mb-4 mx-4 text-[#000000]">
          Messages
        </p>
        <div className="flex items-center justify-between bg-white pb-7 shrink-0 border-b border-b-grey h-[72px] md:mx-4">
          <SearchInput
            containerClass="flex-1"
            inputProps={{
              placeholder: "Find Messages",
              value: searchValue,
            }}
            onChange={handleSearchChange}
          />

          <div className="relative">
            <Image
              src={FilterIcon}
              height={24}
              width={24}
              alt="filter"
              className="ml-6 mr-3 cursor-pointer "
              onClick={() => setShowFilterDialog(true)}
            />
            <Popover
              openDialog={showFilterDialog}
              setOpenDialog={setShowFilterDialog}
              containerClass="md:-left-[330px] md:inset-x-0 md:inset-y-0 md:flex md:items-center md:justify-center md:fixed md:top-0 md:left-0 md:h-fit md:w-fit md:m-auto"
            >
              <FilterDialog onClose={() => setShowFilterDialog(false)} />
            </Popover>
          </div>
          <div className="relative">
            <Image
              src={SortIcon}
              height={24}
              width={24}
              alt="sort"
              className="cursor-pointer"
              onClick={() => setShowSortDialog(true)}
            />
            <Popover
              openDialog={showSortDialog}
              setOpenDialog={setShowSortDialog}
              containerClass="md:-left-[330px] md:inset-x-0 md:inset-y-0 md:flex md:items-center md:justify-center md:fixed md:top-0 md:left-0 md:h-fit md:m-auto md:w-fit"
            >
              <SortDialog onClose={() => setShowSortDialog(false)} />
            </Popover>
          </div>
        </div>

        <div className="h-full overflow-y-auto no-scrollbar">
          {/* {chatData?.length
          ? chatData?.map((item, idx) => <UserCard {...item} key={idx} />)
          : generateSampleArray(6).map((_, idx) => <UserSkeleton key={idx} />)} */}
          {userList?.map((item, idx) => (
            <>
              <UserCard {...item} key={idx} />
              <div ref={loadingRef} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
