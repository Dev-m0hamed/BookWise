import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ value, onChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex items-center">
        <p>#</p>
        <HexColorInput color={value} onChange={onChange} />
      </div>
      <HexColorPicker color={value} onChange={onChange} />
    </div>
  );
};

export default ColorPicker;
