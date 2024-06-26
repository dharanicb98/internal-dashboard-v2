import InduvidualSVG from "./svg/individual";
import CompanySVG from "./svg/companySVG";
import LeftArrowSVG from "./svg/leftArrow";

export default function Icon({ icon, fill, width, height, stroke }) {
  const icons = {
    induvidualSVG: <InduvidualSVG fill={fill} width={width} height={height} />,
    companySVG: <CompanySVG fill={fill} width={width} height={height} />,
    leftArrowSVG: <LeftArrowSVG />,
  };

  const Icon = icons[icon];
  return Icon;
}
