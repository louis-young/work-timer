export interface ButtonProps {
  text: string;
  type: "success" | "danger" | "information" | "default";
  onClick: () => void;
}
