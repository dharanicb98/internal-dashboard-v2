import { OutlinedButton } from "ui/buttons";

export default function AppBar() {
  return (
    <div className="flex justify-between flex-1 mb-[44px]">
      <h4 className="text-black">Chat</h4>
      <div className="flex gap-5 ">
        <div className="w-10 text-black">sm</div>
        <div className="w-10 text-black">dm</div>
        <OutlinedButton text="Host your place" />
      </div>
    </div>
  );
}
