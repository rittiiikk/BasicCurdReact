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
      <button onClick={() => navigate("/create-post")}>Create Post</button>

      {/* Table to display posts */}
      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Gender</th>
            <th>category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.title}
              </td>
              <td>{post.body}</td>
              <td>{post.gender}</td>
              <td>{post.category}</td>
              <td>
                <button onClick={() => navigate(`/${post.id}/edit`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostLists;
