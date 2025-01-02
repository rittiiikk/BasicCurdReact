import { trimPathRight } from "@tanstack/react-router";
import { useState } from "react";

const PostForm = ({ onSubmit, initialValue }) => {
  const [post, setPost] = useState({
    title: initialValue.title || "",
    body: initialValue.body || "",
    Category: initialValue.Category || "",
    gender: initialValue.gender || "",
  });

  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const renderField = (label) => (
    <div>
      <label>{label}</label>
      <input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={post[label.toLowerCase()]}
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: "",
      // Category: "",
      gender: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderField("Title")}
      {renderField("Body")}
      <select
        onChange={handleChangeInput}
        name="category"
        style={{
          padding: "10px",
          margin: trimPathRight,
          float: "right",
        }}
      >
        <option value="news">News</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Sports">Sports</option>
      </select>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          margin: "20px 0",
        }}
      >
        <label>Gender</label>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={post.gender === "male"}
            onChange={handleChangeInput}
            style={{
              margin: "10px",
              accentColor: "#007BFF",
            }}
          />
          Male
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={post.gender === "female"}
            onChange={handleChangeInput}
            style={{
              margin: "10px",
              accentColor: "#007BFF",
            }}
          />
          Female
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
