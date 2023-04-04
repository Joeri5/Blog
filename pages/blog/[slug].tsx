import React from 'react';
import {useBlog} from "@/data/blog";
import Layout from "@/components/layout";
import ReactMarkdown from 'react-markdown';
import {useRouter} from "next/router";
import Highlight from "react-highlight";

const Blog = () => {
    const slug = useRouter().query.slug?.toString();
    const {data: blog, error} = useBlog(slug || "");

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
                        {blog.codeSnippet ? (
                            <div className="px-10 pt-5 gap-2 flex flex-col text-xs">
                                <p className="text-base">Code Snippet:</p>
                                <Highlight className={blog.codeLanguage}>
                                    {blog.codeSnippet}
                                </Highlight>
                            </div>
                        ) : null}
                    </>
                ))}
            </main>
        </Layout>
    );
};

export default Blog;
