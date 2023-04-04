import React from 'react';
import {useBlog} from "@/data/blog";
import Layout from "@/components/layout";
import ReactMarkdown from 'react-markdown';


const Blog = () => {
    const {data: blog, error} = useBlog();

    return (
        <Layout px={false}>
            <main>
                {blog?.map((blog) => (
                    <>
                        <div className="w-full bg-black/20 flex items-center justify-center -mt-8">
                            <img className="w-screen object-contain max-h-[50vh] p-5"
                                 src={blog.blogImage.url}
                                 alt={"Blog image of the blog: " + blog.title}/>
                        </div>
                        <div className="px-10">
                            <h1 className="py-5 text-2xl">{blog.title}</h1>
                            <ReactMarkdown className="space-y-5">{blog.content}</ReactMarkdown>
                        </div>
                    </>
                ))}
            </main>
        </Layout>
    );
};

export default Blog;
