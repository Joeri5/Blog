import React from 'react';
import Navbar from "@/components/menu/navbar";
import Footer from "@/components/menu/footer";

interface Props {
    children: React.ReactNode;
    px: boolean;
}

const Layout = ({children, px}: Props) => {
    return (
        <div className="">
            <div className="">
                <Navbar/>
            </div>
            <div className={`${px === true ? "px-10" : ""} pt-28 pb-10 min-h-[calc(100vh-3rem)]`}>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
