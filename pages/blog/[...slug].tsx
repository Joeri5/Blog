import React from 'react';
import {useBlog} from "@/data/blog";

const Blog = () => {
    const {data: blog, error} = useBlog();

    return (
        <div>
            hello world
            {blog?.map((blog) => (
                <>
                    <h1>{blog.title}</h1>
                </>
            ))}
        </div>
    );
};

export default Blog;
