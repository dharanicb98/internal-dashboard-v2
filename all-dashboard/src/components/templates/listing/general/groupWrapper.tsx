import React from "react";

export default function GroupWrapper(props: GroupWrapperProps) {
  const {
    name,
    description,
    action,
    children,
    containerClass = "",
    titleClass = "",
    descriptionClass = "",
    wrapperClass = ''
  } = props;
  return (
    <div className={`${wrapperClass}`}>
      <div className={`flex items-center mb-8 ${containerClass}`}>
        <div>
          <p className={`text-grey-light ${titleClass}`}>{name}</p>
          <p className={descriptionClass}>{description}</p>
        </div>
        <div className="ml-auto">{action}</div>
      </div>
      {children}
    </div>
  );
}

interface GroupWrapperProps extends Children {
  name: string;
  description?: string;
  action?: React.ReactNode;
  containerClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  wrapperClass?: string;
}
