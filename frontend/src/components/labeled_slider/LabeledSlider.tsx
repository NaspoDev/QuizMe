import { useState } from "react";
import "./LabeledSlider.scss";

interface LabeledSliderProps {
  minValue: number;
  maxValue: number;
  defaultValue: number;
  htmlSliderId: string;
  label: string;
  labelPostfix?: string;
  additionalClasses?: string;
}

// A custom slider component that comes with a label and updating value display.
function LabeledSlider({
  minValue,
  maxValue,
  defaultValue,
  htmlSliderId,
  label,
  labelPostfix,
  additionalClasses,
}: LabeledSliderProps) {
  const [value, setValue] = useState<string>(defaultValue.toString());

  return (
    <div className={`LabeledSlider ${additionalClasses}`}>
      <div className="info-container">
        <label htmlFor={htmlSliderId} className="font-semibold">
          {label}
        </label>
        <p className="slider-value-display">
          {value}
          {labelPostfix}
        </p>
      </div>

      <input
        type="range"
        min={minValue}
        max={maxValue}
        defaultValue={defaultValue}
        id={htmlSliderId}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default LabeledSlider;
