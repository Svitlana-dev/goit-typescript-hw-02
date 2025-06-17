export type Image = {
  id: string;
  url: string;
  regular: string;
  description: string | null;
  likes: number;
  user: {
    name: string;
  };
};
