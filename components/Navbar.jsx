import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-600 px-8 py-3">
        <Link href={"/"} className="text-white font-bold">Next CRUD</Link>
        <Link href={"/addTopic"} className="bg-slate-100 p-2 px-3 text-black font-semibold rounded-sm">Add Topic</Link>
    </nav>
  )
}

export default Navbar