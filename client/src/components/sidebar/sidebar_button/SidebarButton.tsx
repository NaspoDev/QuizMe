import "./SidebarButton.scss";

interface SidebarButtonProps {
  text: string;
  onClick: () => void;
  iconImage?: string;
  additionalClasses?: string;
  additionalImageClasses?: string;
}

function SidebarButton({
  text,
  onClick,
  iconImage,
  additionalClasses,
  additionalImageClasses,
}: SidebarButtonProps) {
  return (
    // Default background color is orange.
    <div
      className={`SidebarButton button sidebar-button-orange ${additionalClasses} ${
        iconImage ? "sidebar-icon-button" : ""
      }`.trim()}
      onClick={onClick}
    >
      {iconImage && (
        <img
          src={iconImage}
          className={`sidebar-icon-image ${additionalImageClasses}`.trim()}
        />
      )}
      <p className="sidebar-button-text">{text}</p>
    </div>
  );
}

export default SidebarButton;
