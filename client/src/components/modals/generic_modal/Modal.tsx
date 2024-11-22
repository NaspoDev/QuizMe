import { ReactNode, useEffect } from "react";
import "./Modal.scss";

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  additionalClasses?: string;
  children?: ReactNode;
}

// Generic Modal Component. Used by more specific types of modals.
// It has generic shared behaviour like open and close behaviours, and styling.

// Usage: Create and use a specific modal component which returns this Modal
// component. You can then add children to it to build your modal.
function Modal({
  isOpen,
  closeModal,
  additionalClasses,
  children,
}: ModalProps) {
  // Set event listeners on mount to listen for `esc` key click or
  // clicking outside of modal to close it.
  useEffect(() => {
    if (isOpen) {
      // Window click listener.
      document
        .getElementById("modal-overlay")
        ?.addEventListener("click", handleOutsideClick);

      // Key press listener.
      window.addEventListener("keydown", handleKeyPress);
    } else {
      // When the modal is closed, remove the listeners.
      document
        .getElementById("modal-overlay")
        ?.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyPress);
    }

    // Remove the event listeners when the component unmounts.
    // This is used as another safety even though we already have the if statement above.
    return () => {
      document
        .getElementById("add-topic-modal-overlay")
        ?.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen]);

  // Function to handle when the user clicks outside the modal.
  // Closes the modal.
  function handleOutsideClick(): void {
    closeModal();
  }

  // Function to handle when the user presses a key.
  // If it is the escape key, close the modal.
  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key == "Escape") {
      closeModal();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={`Modal ${additionalClasses}`}>{children}</div>
      <div className="modal-overlay" id="modal-overlay"></div>
    </>
  );
}

export default Modal;
