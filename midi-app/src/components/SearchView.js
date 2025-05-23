import React from "react";

export default function SearchView({
  tags,
  selectedTags,
  searchTerm,
  onInputChange,
  onTagToggle,
  onSubmit,
  results,
}) {
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => onTagToggle(tag.id)}
              style={{
                background: selectedTags.includes(tag.id) ? "#d1d1d1" : "#e0e0e0",
                padding: "8px 12px",
                borderRadius: "12px",
                border: "none",
                boxShadow: `
                  6px 6px 10px #bebebe,
                  -6px -6px 10px #ffffff`,
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <button type="submit">Search</button>

      <div style={{ marginTop: "24px" }}>
        <h3>Results:</h3>
        {results.length === 0 ? (
          <p>No results.</p>
        ) : (
          results.map((file, idx) => (
            <div
              key={idx}
              style={{
                padding: "16px",
                margin: "12px 0",
                background: "#e0e0e0",
                borderRadius: "16px",
                boxShadow: `
                  6px 6px 12px #bebebe,
                  -6px -6px 12px #ffffff`,
              }}
            >
              <p><strong>Name:</strong> {file.name}</p>
              <p><strong>Description:</strong> {file.description}</p>
              <p><strong>Tags:</strong> {file.tags.join(", ")}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        )}
      </div>
    </form>
  );
}
