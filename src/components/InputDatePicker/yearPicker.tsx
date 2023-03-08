import React from "react";
import Select from "../Select";
import { buildYears } from "./utils/generator";

interface YearPickerProps {
  selectedYear: number;
  defaultValue: string;
  onSelectYear: (value: number) => void;
}

function YearPicker(props: YearPickerProps) {
  const { selectedYear, defaultValue, onSelectYear } = props;
  const years = buildYears(selectedYear, 50);
  return (
    <div>
      <Select defaultValue={defaultValue} style={{ width: 80 }} onChange={(value) => onSelectYear(Number(value))}>
        {years.map((year: number, i: number) => (
          <Select.Option value={year.toString()} key={i}>{year}</Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default YearPicker;
