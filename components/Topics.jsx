import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to fetch topic");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Topics = async () => {
  const { topics } = await getTopics();
  return (
    <>
      {topics.map((t, index) => (
        <div key={index} className="flex justify-between p-4 border border-slate-400 my-3 items-start">
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <p>{t.description}</p>
          </div>
          <div className="flex gap-3">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Topics;
