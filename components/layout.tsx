import React from 'react';
import Navbar from "@/components/menu/navbar";
import Footer from "@/components/menu/footer";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <div>
            <div className="">
                <Navbar/>
            </div>
            <div className="px-10 pt-28 pb-10">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
