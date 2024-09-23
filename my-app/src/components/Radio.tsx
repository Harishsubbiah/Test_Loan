import React from "react";

interface RadioProps {
  name: string;
  id: string;
  radioLabel: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;

}
export const Radio: React.FC<RadioProps> = (props) => {
  const { name, id, radioLabel, value, onChange, checked } = props;
  return (
    <div className="form-check">
      <input
        type="radio"
        className="form-check-input"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label className="form-check-label" htmlFor={id}>
        {radioLabel}
      </label>
    </div>
  );
};
