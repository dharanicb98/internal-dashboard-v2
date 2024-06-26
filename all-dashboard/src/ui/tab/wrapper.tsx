export default function TabWrapper(props: TabWrapperProps) {
  const {
    tabs,
    value,
    wrapperClass = "h-full",
    defaultTab,
    itemClass = "",
  } = props;

  const isHidden = (item: string) => !(item === (value || defaultTab));

  return (
    <div className={wrapperClass}>
      {tabs?.map((item, idx) => (
        <div
          className={`${
            isHidden(item.value) ? "hidden" : "block"
          } h-full ${itemClass}`}
          aria-hidden={isHidden(item.value)}
          key={idx}
        >
          {item.component}
        </div>
      ))}
    </div>
  );
}

interface TabWrapperProps {
  tabs: TabType[];
  value: string;
  defaultTab?: string;
  wrapperClass?: string;
  itemClass?: string;
}

interface TabType {
  value: string;
  component: React.ReactNode;
}
