import React, { useState } from "react";
import {
  deleteFile,
  updateFile,
} from "../controllers/searchController";
import "./SearchView.css";

export default function SearchView({
  tags,
  selectedTags,
  searchTerm,
  onInputChange,
  onTagToggle,
  onSubmit,
  results,
  setResults,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (file) => {
    setEditingId(file.id);
    setEditData({
      id: file.id,
      name: file.name,
      description: file.description,
      tagsText: file.tags.join(" "),
      file: null,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setEditData({ ...editData, file: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const saveEdit = () => {
    updateFile(editData, () => {
      const updated = results.map((f) =>
        f.id === editData.id
          ? {
              ...f,
              name: editData.name,
              description: editData.description,
              tags: editData.tagsText.split(/[\s,]+/),
            }
          : f
      );
      setResults(updated);
      cancelEdit();
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Search by Title:</label>
        <input
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={onInputChange}
          placeholder="Search titles..."
        />
      </div>

      <div>
        <label>Filter by Tags:</label>
        <div className="tag-container">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => onTagToggle(tag.id)}
              className={`tag-button ${
                selectedTags.includes(tag.id) ? "selected" : ""
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <button type="submit">Search</button>

      <div className="results">
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No results.</p>
        ) : (
          results.map((file) => (
            <div className="result-card" key={file.id}>
              {editingId === file.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="tagsText"
                    value={editData.tagsText}
                    onChange={handleEditChange}
                  />
                  <input
                    type="file"
                    name="file"
                    accept=".mid"
                    onChange={handleEditChange}
                  />
                  <button onClick={saveEdit} type="button">
                    Save
                  </button>
                  <button onClick={cancelEdit} type="button">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {file.name}</p>
                  <p><strong>Description:</strong> {file.description}</p>
                  <p><strong>Tags:</strong> {file.tags.join(", ")}</p>
                  <button onClick={() => startEdit(file)} type="button">
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      deleteFile(file.id, () =>
                        setResults(results.filter((f) => f.id !== file.id))
                      )
                    }
                    type="button"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </form>
  );
}
