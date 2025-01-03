import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, fetchPosts } from "../api/post";
import PostForm from "./PostForm";
import { v4 as uuidv4 } from "uuid";

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Post</h2>
      <PostForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
};

export default AddPost;
