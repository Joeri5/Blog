import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import BlogItem from "@/components/blog/blog.item";
import { useBlogs } from "@/data/blog";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Blogs() {
  const { data: blogs, error } = useBlogs();
  const [filter, setFilter] = useState("all");

  let blogItems = blogs?.sort((a, b) => {
    return (
      new Date(a.timeCreated).getTime() - new Date(b.timeCreated).getTime()
    ); //sort by date
  });

  if (filter !== "all") {
    blogItems = blogItems?.filter((blog) => blog.tags.includes(filter));
  }

  const tags = [
    "all",
    "feedback",
    "oplossend",
    "samenwerken",
    "teamwork",
    "verbetering",
  ];

  return (
    <>
      <Head>
        <title>Stageblog</title>
        <meta name="description" content="Stageblog van Joeri Schenk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout px={true}>
        <main>
          <div>
            <h3 className=" text-lg font-semibold">Blogs:</h3>
            <div>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`mb-3 mt-2 mr-2 py-1 px-3 border rounded ${
                    filter === tag ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogItems?.map((blog) => (
                <>
                  <BlogItem
                    key={blog.slug}
                    title={blog.title}
                    content={blog.content}
                    image={blog.blogImage.url}
                    link={"/blog/" + blog.slug}
                    date={blog.timeCreated}
                    tags={blog.tags}
                  />
                </>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
