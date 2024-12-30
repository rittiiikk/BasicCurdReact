import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, fetchPosts } from "../api/post";
import PostForm from "./PostForm";
import { v4 as uuidv4 } from "uuid";
// import {PostForm} from "./PostForm";

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // console.log("success bro!");
      alert("Post created...");
    },
  });

  const {
    data: allPosts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate({
      id: uuidv4(),
      ...post,
    });
  };

  console.log(allPosts, 26);

  return (
    <div>
      <h2> Create New Post </h2>
      <PostForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  );
};

export default AddPost;
