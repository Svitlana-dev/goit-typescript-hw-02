import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: Image | null;
};

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, selectedImage }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.content}
      overlayClassName={css.overlay}
      contentLabel="Image Modal"
    >
      {selectedImage && (
        <>
          <img src={selectedImage.regular} />
          <p>
            <strong>Likes: </strong>
            {selectedImage.likes}
          </p>
          <p>
            <strong>Author: </strong>
            {selectedImage.user.name}
          </p>
        </>
      )}
    </Modal>
  );
}
