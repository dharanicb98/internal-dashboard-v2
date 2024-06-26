import React from "react";
import Image from "next/image";
import MenuIcon from "assets/icons/kebab-menu.svg";
import CloseRounded from "assets/icons/close-rounded.svg";
import useClickListener from "utils/hooks/useClickListener";

export default function MediaCard(props: MediaCardProps) {
  const { imgUrl, containerClass = "", actions = [] } = props;
  const [showHighlightMenu, setShowHighlightMenu] = React.useState(false);
  const menuTarget = React.useRef<HTMLDivElement>(null);
  const clickMenuClick = React.useCallback((e: MouseEvent) => {
    if (menuTarget.current && !menuTarget.current.contains(e.target as Node)) {
      setShowHighlightMenu(false);
    }
  }, []);
  useClickListener(clickMenuClick);
  return (
    <div
      className={`relative h-56 rounded bg-cover ${containerClass}`}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowHighlightMenu(true);
          }}
          className="h-6 w-4"
        >
          <Image src={MenuIcon} alt="menu" />
        </button>
      </div>

      <div
        className="absolute top-3 right-7"
        ref={menuTarget}
        style={{ display: showHighlightMenu ? "block" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowHighlightMenu(false)}
          className="absolute right-2 top-1 h-3.5 w-3.5"
        >
          <Image src={CloseRounded} alt="close" />
        </button>
        <div className="p-2 pr-8 bg-white rounded-md flex flex-col items-start gap-2">
          {actions.map((item, idx) => (
            <button className="text-xs" onClick={item.handler} key={idx}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MediaCardProps {
  imgUrl: string;
  containerClass?: string;
  actions: {
    title: string;
    handler: () => void;
  }[];
}
