import React, { useState } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const handleChange = () => navigate('/search');

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/auth/addpdf", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        alert("Form submitted successfully!");
        setTitle("");
        setDescription("");
        setFile(null);
        document.getElementById("fileInput").value = "";
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      alert("Error submitting form");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Research Submission Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Research Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Short Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Research (PDF only):</label>
          <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <div className="buttons">
          <div className="subbutton">
            <button type="submit" className="submit-button">Submit</button>
          </div>
          <div className="srchbutton">
            <button onClick={handleChange} type="button" className="search-button">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
}
