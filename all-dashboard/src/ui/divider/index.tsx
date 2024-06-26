export default function Divider(props: DividerProps) {
  const { orientation = "horizontal", className = "" } = props;

  if (orientation === "horizontal") {
    return (
      <hr className={`my-2 shrink-0 border-b w-auto self-stretch ${className}`}/>
    );
  }

  return (
    <hr className={`mx-2 shrink-0 border-l h-auto self-stretch ${className}`} />
  );
}

interface DividerProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}
