import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <nav
            className="w-screen py-5 fixed px-10 flex items-center align-middle justify-between bg-black/10 backdrop-filter backdrop-blur-xl">
            <Link href={'/'} className="flex items-center gap-2">
                <img className="w-8 object-cover" src="/joeri.svg" alt=""/>
                <h1 className="text-xl lg:text-2xl font-normal"><span className="text-blue-500">J</span>oeri</h1>
            </Link>
            <Link href="/blogs" className="lg:text-lg py-2 px-5 rounded-md text-white bg-blue-500">
                Blogs
            </Link>
        </nav>
    );
};

export default Navbar;
