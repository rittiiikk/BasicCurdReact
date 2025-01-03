import { Route, Routes } from "react-router-dom";
// import Post from "./Pages/Post";
import PostLists from "./Pages/PostLists";
import EditPost from "./Pages/EditPost";
import AddPost from "./Components/AddPost";

function App() {
  return (
    <div>
      <h1>Cirrius Task</h1>
      <Routes>
        <Route path="/" element={<PostLists />} />
        <Route path="/create-post" element={<AddPost />} />
        {/* <Route path="/post/:id" element={<Post />} /> */}
        <Route path="/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
