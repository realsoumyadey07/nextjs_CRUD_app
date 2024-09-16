"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";



const EditTopicForm = ({ title, description, id }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();
  const handleEdit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({title: newTitle, description: newDescription}),
      });
      if(res.ok){
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleEdit} className="flex flex-col gap-3">
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border border-slate-400 px-8 py-2"
        type="text"
      />
      <input
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="border border-slate-400 px-8 py-2"
        type="text"
      />
      <button type="submit" className="bg-green-500 text-white font-bold py-3 px-6 w-fit rounded-sm hover:bg-green-600">
        Update Topic
      </button>
    </form>
  );
};

export default EditTopicForm;
