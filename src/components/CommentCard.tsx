import { useState } from "react";
import { Data } from "../types";

type Props = {
  data: Data;
  setData: (value: React.SetStateAction<Data[]>) => void;
};

const CommentCard = ({ data, setData }: Props) => {
  const [input, setInput] = useState("");

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInput((e.target as HTMLInputElement).value);
  };

  const onDeleteReply = (replyId: number) => {
    setData((prev) => {
      const currentComment = prev.filter((item) => item.id === data.id)[0];
      const currentCommentIndex = prev.indexOf(currentComment);

      const currentReply = currentComment.comments.filter(
        (reply) => reply.id === replyId
      )[0];
      const currentReplyIndex = currentComment.comments.indexOf(currentReply);
      currentComment.comments.splice(currentReplyIndex, 1);
      const newData = [...prev];
      newData.splice(currentCommentIndex, 1, currentComment);
      return newData;
    });
  };

  const onDeleteComment = (commentId: number) => {
    setData((prev) => {
      const currentComment = prev.filter((item) => item.id === commentId)[0];
      const currentCommentIndex = prev.indexOf(currentComment);

      prev.splice(currentCommentIndex, 1);
      return [...prev];
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") return;
    setInput("");
    setData((prev) => {
      const currentComment = prev.filter((item) => item.id === data.id)[0];

      const addReply = {
        id:
          currentComment.comments.length === 0
            ? 1
            : currentComment.comments[0].id + 1,
        text: input,
      };
      currentComment.comments.unshift(addReply);

      return [...prev];
    });
  };

  return (
    <div className="bg-white f-ull rounded-lg p-4 mb-5">
      <div className="flex justify-between items-center  mb-4">
        <h2 className="text-emerald-800 font-medium text-xl">{data.title}</h2>
        <button
          onClick={() => onDeleteComment(data.id)}
          type="button"
          className="w-7 h-7 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          X
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-7">{data.commentText}</p>
      <form className="mb-8" onSubmit={onSubmit}>
        <textarea
          className="w-full p-2 border-2 border-blue-400 bg-white rounded-lg"
          rows={5}
          placeholder="Leave a comment..."
          value={input}
          onChange={onChange}
        ></textarea>
        <div className="text-right">
          <button
            className="bg-yellow-300 px-2 py-1 rounded-lg hover:bg-yellow-400 "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {data.comments.length > 0 && (
        <h2 className="text-emerald-800 font-medium text-xl mb-4">Reply</h2>
      )}
      {data.comments.map((comment) => {
        return (
          <div
            key={comment.id}
            className="flex justify-between items-center border-b-2 border-indigo-500 mb-3"
          >
            <p className="text-gray-700 ">{comment.text}</p>
            <button
              onClick={() => onDeleteReply(comment.id)}
              type="button"
              className="float-right bg-purple-400 w-5 h-5 rounded-full text-sm text-gray-50"
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentCard;
