export default interface SelectProps {
  label: string;
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
  options: { [key: string]: string };
}
