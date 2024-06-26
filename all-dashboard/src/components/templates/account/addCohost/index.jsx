import React from "react";
import InviteForm from "./inviteForm";
import InviteHome from "./inviteHome";
export default function AddCoHost() {
  const [showInviteForm, setShowInviteForm] = React.useState(false);
  return (
    <div>
      {showInviteForm ? (
        <InviteForm changePage={setShowInviteForm} />
      ) : (
        <InviteHome changePage={setShowInviteForm} />
      )}
    </div>
  );
}
