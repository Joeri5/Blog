import Head from 'next/head'
import {Inter} from 'next/font/google'
import Layout from "@/components/layout";
import BlogItem from "@/components/blog/blog.item";
import {useBlogs} from "@/data/blog";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const {data: blogs, error} = useBlogs();

    const recentBlogs = blogs?.slice(0, 6);
    console.log(blogs)

    return (
        <>
            <Head>
                <title>Stageblog</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout px={true}>
                <main>
                    <div>
                        <h3 className="pb-3 text-lg font-semibold">Recently added items:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {recentBlogs?.map((blog) => (
                                <>
                                    <BlogItem title={blog.title} content={blog.content} image={blog.blogImage.url}
                                              link={'/blog/' + blog.slug} date={blog.timeCreated}/>
                                </>
                            ))}
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}
