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
      className={"btn btn-" + color}
      onClick={() => {
        onButtonClicked(children);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
