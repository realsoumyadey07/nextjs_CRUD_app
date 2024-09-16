"use client";
import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to fetch topic");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};



const Topics = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics);
    };
    fetchTopics();
  }, []);
  return (
    <>
      {topics &&
        topics.map((t, index) => (
          <div
            key={index}
            className="flex justify-between p-4 border border-slate-400 my-3 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <p>{t.description}</p>
            </div>
            <div className="flex gap-3">
              <RemoveBtn id={t._id} />
              {/* <MdDeleteForever
                onClick={() => deleteTopic(t._id)}
                size={24}
                color="red"
              /> */}
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


