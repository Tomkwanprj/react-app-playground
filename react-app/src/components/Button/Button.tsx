import styles from "./Button.module.css";

interface ButtonProps {
  children: string;
  color?: "primary" | "secondary" | "danger";
  onButtonClicked: (children: string) => void;
}

const Button = ({
  children,
  onButtonClicked,
  color = "primary",
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[styles.button, styles["btn-" + color]].join(" ")}
      onClick={() => {
        onButtonClicked(children);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
