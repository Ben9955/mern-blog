import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch("api/post/getposts");

        if (!res.ok) throw new Error("Error while fetching posts");

        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-3xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Adipiscing blandit. Neque condimentum Lacus etiam congue dui praesent.
          Risus venenatis quam cursus primis enim nibh Consequat placerat
          porttitor.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="p-0 bg-amber-100 dark:bg-slate-700 ">
        <CallToAction />
      </div>

      {posts && posts.length > 0 && (
        <div className=" max-w-6xl mx-auto px-3 flex flex-col gap-8 mb-10 items-center">
          <h3 className="text-xl font-semibold lg:text-2xl text-center mb-5">
            Recent Posts
          </h3>
          <div className="flex flex-wrap justify-center items-center  gap-4 px-10 md:px-40">
            {posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
          <Link
            to="/search"
            className="text-lg  text-teal-500 font-semibold hover:underline "
          >
            View all posts
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
