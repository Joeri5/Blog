import React, { useState } from "react";
import Head from "next/head";
import { useBlog } from "@/data/blog";
import Layout from "@/components/layout";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Highlight from "react-highlight";
import { useBlogComments } from "@/data/comment";
import { mutate } from "swr";

type Comment = {
  username: string;
  message: string;
  slug: string;
};

const Blog = () => {
  const router = useRouter();

  const slug = router.query.slug;

  const { data: blog, error } = useBlog(slug as string);
  const { data: comments, error: commentError } = useBlogComments(
    slug as string
  );
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure slug is a string
    if (typeof slug !== "string") {
      console.error("Slug is not a string");
      return;
    }

    // Prepare the new comment
    const newComment: Comment = {
      username: username,
      message: message,
      slug: slug,
    };

    const res = await fetch(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    const data = await res.json();
    console.log(data);

    // Reset form
    setUsername("");
    setMessage("");

    // Add the new comment locally and revalidate in the background
    mutate(
      `/api/comment/${slug}`,
      (existingComments: Comment[] | undefined) => {
        // We assert that existingComments is always defined.
        // This may not be true depending on your API, so you might need a different approach
        existingComments = existingComments || [];

        return [...existingComments, newComment];
      },
      false // This flag tells SWR not to re-fetch the data immediately
    );
  };

  return (
    <>
      <Head>
        <title>Stageblog</title>
        <meta name="description" content="Stageblog van Joeri Schenk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout px={false}>
        <main>
          {blog?.map((blog) => (
            <>
              <div className="w-full bg-blue-500/20 flex items-center justify-center -mt-7">
                <img
                  className="w-screen object-contain max-h-[50vh] p-5"
                  src={blog.blogImage.url}
                  alt={"Blog image of the blog: " + blog.title}
                />
              </div>
              <div className="px-10 lg:px-32">
                <h1 className="py-5 text-2xl">{blog.title}</h1>
                <ReactMarkdown className="space-y-5">
                  {blog.content}
                </ReactMarkdown>
              </div>
              {blog.codeSnippet ? (
                <div className="px-10 lg:px-32 pt-5 gap-2 flex flex-col text-xs">
                  <p className="text-base">Code Snippet:</p>
                  <Highlight className={blog.codeLanguage}>
                    {blog.codeSnippet}
                  </Highlight>
                </div>
              ) : null}
            </>
          ))}
        </main>
        <form onSubmit={handleSubmit} className="px-10 lg:px-32 pt-10">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              Plaats een Reactie
            </h2>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="text-sm font-bold text-gray-700"
              >
                Bericht:
              </label>
              <textarea
                id="message"
                className="border border-gray-300 rounded-lg p-2 w-full resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-sm font-bold text-gray-700"
              >
                Naam:
              </label>
              <input
                id="username"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white w-full"
            >
              Plaats Reactie
            </button>
          </div>
        </form>

        <div className="mt-6 px-10 lg:px-32">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              {comments?.length} Reactie{comments?.length !== 1 ? "s" : ""}
            </h2>
            {comments
              ?.sort(
                (a, b) =>
                  new Date(b.creation).getTime() -
                  new Date(a.creation).getTime()
              )
              .map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-lg mb-4 p-4"
                >
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold text-blue-900">
                      {comment.username}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      op {new Date(comment.creation).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mb-2 text-sm">{comment.message}</p>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
