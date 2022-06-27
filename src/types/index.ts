export type Comment = {
  id: number;
  text: string;
};

export type Data = {
  id: number;
  title: string;
  commentText: string;
  comments: Comment[];
};
