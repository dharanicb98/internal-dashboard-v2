import { useRouter } from "next/router";

export default function MobileTab(props: TabListProps) {
  const {
    items,
    paramKey = "tab",
    flexProps = {},
    containerProps = {},
    containerClass = "",
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
      className={`text-center ${
        sticky ? "sticky" : ""
      } hidden md:block ${containerClass}`}
      {...containerProps}
    >
      <ul
        className="flex flex-wrap items-center justify-between -mb-px"
        {...flexProps}
      >
        {items.map((item) => {
          const selectedClass =
            item.value === (router.query[paramKey] || defaultTab)
              ? "border-black bg-black text-white rounded-full "
              : "border-transparent text-grey-dark";
          return (
            <li
              className="flex items-center justify-center cursor-pointer"
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
                <p className={`px-4 py-2 ${selectedClass}`}>{item.key}</p>
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
