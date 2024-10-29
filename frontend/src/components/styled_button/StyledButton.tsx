import "./StyledButton.scss";

interface Props {
  type?: "text" | "icon" | "iconAndText";
  additionalClasses?: string;
}

// Custom button for the app.
// Can handle icon and text, just text, or just icon.
function StyledButton({ type = "text", additionalClasses }: Props) {
  if (type == "text") {
    return (
      <button
        className={`StyledButton StyledButtonText ${additionalClasses}`}
      ></button>
    );
  }
  return <button className={`StyledButton ${additionalClasses}`}></button>;
}

export default StyledButton;
