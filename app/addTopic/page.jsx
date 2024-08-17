"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";



const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title && !description){
      alert("Titile and description are required");
    }
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({title, description})
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border border-slate-400 px-8 py-2"
        type="text"
        placeholder="Enter the topic"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />
      <input
        className="border border-slate-400 px-8 py-2"
        type="text"
        placeholder="Enter the Description"
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white font-bold py-3 px-6 w-fit rounded-sm hover:bg-green-600">
        Add Topic
      </button>
    </form>
  );
};

export default AddTopic;
