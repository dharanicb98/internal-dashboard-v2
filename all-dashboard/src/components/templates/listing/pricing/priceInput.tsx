import FilledInput from "ui/input/filledInput";
import Image from "next/image";
import InfoOutlinedIcon from "assets/icons/info-outlined.png";

export default function PriceInput(props: PriceInputProps) {
  const { title, info, value, onChange } = props;
  return (
    <div>
      <div>
        <p className="text-lg">{title}</p>
        {!!info && <Image src={InfoOutlinedIcon} alt="info" />}
      </div>
      <FilledInput
        className="mt-4 text-xl"
        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        type="number"
      />
    </div>
  );
}

interface PriceInputProps {
  title: string;
  info?: string;
  value: number;
  onChange: (value: number) => void;
}
