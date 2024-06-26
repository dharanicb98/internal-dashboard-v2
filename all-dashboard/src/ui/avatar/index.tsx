import React from "react";
import Image from "next/image";
import AvatarIcon from "assets/images/avatar.svg";

export default function Avatar(props: AvatarProps) {
  const { url, containerClass = "", ...rest } = props;
  const [error, setError] = React.useState(false);

  return (
    <div className={`relative h-10 w-10 ${containerClass}`}>
      <Image
        className="rounded-full"
        src={error ? AvatarIcon : url}
        alt="Rounded avatar"
        // width={40}
        // height={40}
        fill
        onError={() => setError(true)}
        {...(rest || {})}
      />
    </div>
  );
}

interface AvatarProps extends Record<string, any> {
  url: string;
}
