import axios from "axios";

const API_KEY = import.meta.env.VITE_UNSPLASH_KEY;

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: { Authorization: `Client-ID ${API_KEY}` },
});

type ImageResult = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
  description: string | null;
  likes: number;
  user: {
    name: string;
  };
};

type Image = {
  id: string;
  url: string;
  regular: string;
  description: string;
  likes: number;
  user: string;
};

type ApiResponse = {
  results: ImageResult[];
  total_pages: number;
};

export const fetchImages = async (
  query: string,
  currentPage = 1,
  perPage = 10
): Promise<{ images: Image[]; totalPages: number }> => {
  const { data }: { data: ApiResponse } = await api.get("/search/photos", {
    params: { query, page: currentPage, per_page: perPage },
  });

  const images: Image[] = data.results.map((img) => ({
    id: img.id,
    url: img.urls.small,
    regular: img.urls.regular,
    description: img.alt_description || img.description || "No description",
    likes: img.likes,
    user: img.user.name,
  }));

  return {
    images,
    totalPages: data.total_pages,
  };
};
