"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDeleteForever } from "react-icons/md";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure??");
    if (confirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return <MdDeleteForever onClick={handleDelete} size={24} color="red" />;
};

export default RemoveBtn;
