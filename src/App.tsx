import { useState, useEffect } from "react";
import { fetchImages } from "./services/api";
import css from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";

export default function App() {
  type Image = {
    id: string;
    url: string;
  };

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = (newSearch: string): void => {
    setSearch(newSearch);
    setCurrentPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const openModal = (image: Image): void => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    if (search === "") {
      return;
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError(null);

        const data = await fetchImages(search, currentPage);

        if (data.images.length === 0) {
          throw new Error();
        }

        setImages((prevImages) => [...prevImages, ...data.images]);
        setTotalPages(data.totalPages);
      } catch {
        setIsError("Ooops... Something went wrong... Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [search, currentPage]);

  const hasMore = currentPage < totalPages;
  const hasImages = images.length > 0;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {isError ? (
        <ErrorMessage message={isError} />
      ) : (
        <>
          {hasImages && (
            <ImageGallery images={images} onImageClick={openModal} />
          )}
          {isLoading && <Loader loading={isLoading} />}
          {hasImages && !isLoading && hasMore && (
            <LoadMoreBtn imagesCount={images.length} onClick={loadMore} />
          )}
        </>
      )}

      <ImageModal
        isOpen={selectedImage}
        selectedImage={selectedImage}
        onClose={closeModal}
      />
      <Toaster position="top-center" />
    </div>
  );
}
