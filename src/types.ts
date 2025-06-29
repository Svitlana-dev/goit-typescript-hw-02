export type Image = {
  id: string;
  url: string;
  regular: string;
  description: string;
  likes: number;
  user: {
    name: string;
  };
};
