import { useRouter } from "next/router";

export default function MobileTabGraph(props: TabListProps) {
    const {
      items,
      paramKey = "tab",
      flexProps = {},
      containerProps = {},
      defaultTab,
      sticky,
    } = props;
    const router = useRouter();
  
    const handleClickTab = (value: string) => {
      router.query[paramKey] = value;
      router.replace(router);
    };
  
    return (
      <div
        className={`text-center ${sticky ? "sticky" : ""}`}
        {...containerProps}
      >
        <ul className="flex flex-wrap items-center justify-between -mb-px" {...flexProps}>
          {items.map((item) => {
            const selectedClass =
              item.value === (router.query[paramKey] || defaultTab)
                ? "border-black bg-black text-white text-sm font-medium rounded-[8px] px-2.5 pt-2.5 pb-1.5"
                : "border-transparent text-grey-dark p-2.5";
            return (
              <li
                className="flex items-center justify-center p-2 cursor-pointer"
                key={item.value}
                onClick={() => {
                  if (!item.isElement) {
                    handleClickTab(item.value);
                  }
                }}
                {...(item.listProps || {})}
              >
                {item.isElement ? (
                  <>{item.key}</>
                ) : (
                  <p className={`border-b-2 pb-1 ${selectedClass}`}>{item.key}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  
  interface TabListProps {
    items: TabProp[];
    paramKey?: string;
    defaultTab?: string;
    flexProps?: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    >;
    containerProps?: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    sticky?: boolean;
  }
  
  export interface TabProp {
    listProps?: React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >;
    isElement?: boolean;
    key: React.ReactNode;
    value: string;
  }