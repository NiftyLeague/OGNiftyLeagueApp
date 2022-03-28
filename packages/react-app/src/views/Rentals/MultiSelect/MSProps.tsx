export default interface MultiSelectProps {
  label: string;
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
  options: { [key: string]: string };
}
