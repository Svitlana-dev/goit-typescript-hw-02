import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

type Image = {
  id: string;
  url: string;
  regular: string;
  description: string | null;
  likes: number;
  user: string;
};

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.item}>
          <ImageCard
            src={image.url}
            alt={image.description ?? ""}
            onClick={() => onImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
}
