import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="px-10 py-3 bg-black/10">
            <p><span className="text-blue-500">&copy;</span> {year} Joeri Schenk.</p>
        </footer>
    );
};

export default Footer;
