import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchPosts } from "../api/post";
import AddPost from "../Components/AddPost";

const PostLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className="container">
      <AddPost />

      {posts.map((post) => (
        <div key={post.id} style={{ background: "#777" }}>
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.title}
          </h4>
          <p>{post.body}</p>
          <button onClick={() => navigate(`/${post.id}/edit`)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostLists;
