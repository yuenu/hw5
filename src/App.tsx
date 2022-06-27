import React, { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import { Data, Comment } from "./types";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const getData = window.localStorage.getItem("IData");

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInput((e.target as HTMLInputElement).value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") return;
    setInput("");
    setData((prev) => {
      const count = prev.length === 0 ? 1 : prev[0].id + 1;
      const currentItem = {
        id: count,
        title: `Comment ${count}`,
        commentText: input,
        comments: [] as Comment[],
      };

      window.localStorage.setItem(
        "IData",
        JSON.stringify([currentItem, ...prev])
      );
      return [currentItem, ...prev];
    });
  };

  useEffect(() => {
    if (getData) {
      const parseData: Data[] = JSON.parse(getData);
      setData(parseData);
    }
  }, []);

  useEffect(() => {
    if (data.length === 0) window.localStorage.removeItem("IData");
    if (data.length > 0) {
      window.localStorage.setItem("IData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:w-3/5 xl:w-2/5 mx-auto max-w-2xl">
        <h1 className="text-emerald-600 font-semibold text-3xl my-10">
          留言板Demo App
        </h1>
        <form onSubmit={onSubmit} className=" mb-5">
          <textarea
            onChange={onChange}
            className="w-full p-2 border-2 border-blue-400 bg-white rounded-lg"
            rows={5}
            placeholder="Leave a comment..."
            value={input}
          ></textarea>
          <div className="text-right">
            <button
              className="bg-red-200 px-3 py-2  rounded-lg hover:bg-red-400 hover:text-gray-50"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        {data.map((item) => (
          <CommentCard key={item.id} data={item} setData={setData} />
        ))}
      </div>
    </div>
  );
}

export default App;
