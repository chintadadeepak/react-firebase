import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/form.css";
interface CreatePostData {
  title: string;
  description: string;
}

function CreateForm() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("you should give a title to your post."),
    description: yup
      .string()
      .required("you should give description about your post."),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreatePostData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: yupResolver(schema),
  });
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input
          type="text"
          className="form-input"
          placeholder="Title of the post..."
          {...register("title")}
        />
        <p className="form-error">{errors.title?.message}</p>
        <textarea
          className="form-textarea"
          placeholder="Description about your post..."
          {...register("description")}
        />
        <p className="form-error">{errors.description?.message}</p>
        <input className="form-submit" type="submit" />
      </form>
    </div>
  );
}

export default CreateForm;
