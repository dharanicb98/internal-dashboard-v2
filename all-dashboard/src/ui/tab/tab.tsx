import React from "react";

export default function Tab(props: TabListProps) {
  const {
    items,
    flexProps = {},
    containerProps = {},
    sticky,
    onChange,
    value,
    separator = null,
    selectedTabClass = "",
    containerClass = "",
    buttonClass = "",
    liClass = "",
    scrollIntoView = true,
  } = props;

  const tabsRef = React.useRef<HTMLElement[]>([]);
  React.useEffect(() => {
    if (scrollIntoView) {
      const selectedTab = items.findIndex((item) => item.value === value);
      tabsRef.current[selectedTab]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [value]);

  return (
    <div
      className={`text-center border-b border-gray md:overflow-auto ${
        sticky ? "sticky" : ""
      } ${containerClass}`}
      {...containerProps}
    >
      <ul className="flex gap-8" {...flexProps}>
        {items.map((item, idx) => {
          const selectedClass =
            item.value === value
              ? "border-black md:border-primary font-medium " + selectedTabClass
              : "border-transparent text-grey-dark";
          return (
            <React.Fragment key={item.value}>
              <li
                className={`mr-2 cursor-pointer  whitespace-nowrap ${liClass}`}
                onClick={() => {
                  if (!item.isElement) {
                    onChange(item.value);
                  }
                }}
                ref={(el) => (tabsRef.current[idx] = el!)}
                {...(item.listProps || {})}
              >
                {item.isElement ? (
                  <>{item.key}</>
                ) : (
                  <p
                    className={`border-b-[1px] pb-3.5 ${buttonClass} ${selectedClass}`}
                  >
                    {item.key}
                  </p>
                )}
              </li>
              {separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

interface TabListProps extends Record<string, any> {
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
  onChange: (value: string) => void;
  value: string;
  separator?: React.ReactNode;
  selectedTabClass?: string;
  containerClass?: string;
  buttonClass?: string;
  liClass?: string;
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
