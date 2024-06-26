import { updateTab } from "store/slices/accounts";
import { useDispatch } from "react-redux";
import ProfileTabLayout from "./profileTabLayout";
import React from "react";

function AccountsTab() {
  const dispatch = useDispatch();

  const contentList = [
    {
      handler: () => dispatch(updateTab("social")),
      name: "Social account login",
    },
    {
      handler: () => dispatch(updateTab("taxes")),
      name: "Taxes",
    },
    {
      handler: () => dispatch(updateTab("co-host")),
      name: "Add co-hosts",
    },
    {
      handler: () => dispatch(updateTab("offers")),
      name: "Offers",
    },
    {
      handler: () => dispatch(updateTab("referral")),
      name: "Referral",
    },
    {
      handler: () => dispatch(updateTab("gift-card")),
      name: "Gift Cards",
    },
    {
      handler: () => dispatch(updateTab("tools")),
      name: "Tools",
    },
    {
      handler: () => dispatch(updateTab("cancellation")),
      name: "Cancellation Policies",
    },
  ];

  return (
    <div>
      <ProfileTabLayout
        list={contentList}

      />
    </div>
  );
}

export default AccountsTab;
