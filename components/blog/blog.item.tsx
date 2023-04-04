import React from 'react';
import Link from "next/link";

interface Props {
    image: string;
    link: string;
    title: string;
    content: string;
    date: string;
}

const BlogItem = ({image, link, title, content, date}: Props) => {
    function timeAgo(date: string): string {
        const currentDate = new Date();
        const targetDate = new Date(date);
        const diffMs = currentDate.getTime() - targetDate.getTime();
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHrs = Math.round(diffMin / 60);
        const diffDays = Math.round(diffHrs / 24);

        if (diffSec < 60) {
            return `${diffSec} seconds ago`;
        } else if (diffMin < 60) {
            return `${diffMin} minutes ago`;
        } else if (diffHrs < 24) {
            return `${diffHrs} hours ago`;
        } else {
            return `${diffDays} days ago`;
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <Link href={link || ''} className="w-full">
                <img className="w-full h-[30vh] bg-black/10 object-cover p-5 item-center" src={image}
                     alt={'Cover image for blog: ' + title}/>
            </Link>
            <div className="flex flex-col gap-2">
                <p>
                    <span className="font-medium text-lg">{title}. </span>
                    {content ? content.slice(0, 90) + (content.length > 90 ? '...' : '') : ''}
                </p>
                <div className="flex justify-between">
                    <Link href={link || ''} className="font-semibold flex gap-2">Read more
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="w-6 h-6 text-pink-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
                        </svg>
                    </Link>
                    <p className="opacity-50">
                        {timeAgo(date)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
