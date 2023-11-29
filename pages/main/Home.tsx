import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post from "./Post";
import "../../styles/posts.css";
export interface PostInterface {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
}

function Home() {
  const [postsList, setPostsList] = useState<PostInterface[] | null>(null);
  const postsRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostInterface[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="posts-container">
      {postsList?.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
}

export default Home;
