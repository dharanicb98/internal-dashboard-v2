export default function MobileAppBarTitle(props: MobileAppBarTitle) {
    const { title, sticky } = props;
  
    return (
      <div
        className={`flex items-center flex-between gap-1 ${
          sticky ? "sticky top-0" : ""
        }`}
      >
        <div className="flex gap-3 items-center">
          <div className="text-black text-[32px] font-normal">{title}</div>
        </div>
      </div>
    );
  }
  
  interface MobileAppBarTitle {
    title: React.ReactNode;
    sticky?: boolean;
  }
  