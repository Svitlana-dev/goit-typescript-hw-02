import css from "./LoadMoreBtn.module.css";

type Props = {
  imagesCount: number;
  onClick: () => void;
};

export default function LoadMoreBtn({ imagesCount, onClick }: Props) {
  if (imagesCount === 0) {
    return null;
  }

  return (
    <button type="button" className={css.button} onClick={onClick}>
      Load more
    </button>
  );
}
