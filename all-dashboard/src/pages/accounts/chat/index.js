import React from 'react'
import HostChat from '../../../components/templates/host/chat'
import CustomerChat from '../../../components/templates/customer/chat'
import { useUserDetailsSelector } from "store/selectors/user";

function Chat() {
  const userDetails = useUserDetailsSelector();
  const host = userDetails?.isHost;

  return (
    <div>
        {host ? <HostChat/> :<CustomerChat/> }
    </div>
  )
}

export default Chat