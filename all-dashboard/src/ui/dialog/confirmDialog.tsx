import Dialog from ".";
import Divider from "../divider";

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { open, confirmText, confirmAction, declineAction } = props;
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      backDropClass="confirmDialog__index"
      contentClass="confirmDialogContent__index"
    >
      <div className=" p-8 bg-white rounded-2xl">
        <p className="">{confirmText}</p>
        <Divider className="!border-grey my-5" />
        <div className="flex justify-around">
          <button className="text-grey-dark " onClick={declineAction}>
            Decline
          </button>
          <button className="rounded " onClick={confirmAction}>
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );
}
interface ConfirmDialogProps {
  confirmText: string;
  open: boolean;
  confirmAction?: VoidFunction;
  declineAction: VoidFunction;
}
