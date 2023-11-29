import { PostInterface } from "./Home";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import "../../styles/posts.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
  post: PostInterface;
}

interface Like {
  userId: string;
}

function Post(props: Props) {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [user] = useAuthState(auth);
  const { post } = props;
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const likes = await getDocs(likesDoc);
    setLikes(likes.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeToDelete = await doc(db, "likes", likeToDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev?.filter((like) => like.userId !== user.uid)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post">
      <div className="title">{post.title}</div>
      <div className="description">{post.description}</div>
      <div className="username">@{post.username}</div>
      {hasUserLiked ? (
        <button onClick={removeLike}>
          <ThumbDownIcon></ThumbDownIcon>
        </button>
      ) : (
        <button onClick={addLike}>
          <ThumbUpIcon className="like"></ThumbUpIcon>
        </button>
      )}
      {likes && <p>Likes: {likes.length}</p>}
    </div>
  );
}

export default Post;
