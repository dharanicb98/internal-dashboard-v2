import React from "react";
import MediaCard from "../general/cards/mediaCard";
export default function HighlightCard(props: HighlightCardProps) {
  const { imgUrl, title, description, onRemove, onEdit } = props;

  const actions = [
    {
      title: "Edit highlight",
      handler: onEdit,
    },
    {
      title: "Remove highlight",
      handler: onRemove,
    },
  ];

  return (
    <div className="w-[180px] overflow-hidden">
      <MediaCard
        imgUrl={imgUrl}
        actions={actions}
        containerClass="rounded-2xl"
      />
      <div>
        <p className="font-medium mt-3">{title}</p>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
}

interface HighlightCardProps {
  imgUrl: string;
  title: string;
  description: string;
  onRemove: VoidFunction;
  onEdit: VoidFunction;
}
