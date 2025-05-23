import React from "react";

export default function UploadView({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
        <h2>Upload new MIDI file</h2>
      <div>
        <label>Name: <br/></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label>File (MIDI only):</label>
        <input
          type="file"
          name="file"
          accept=".mid,.midi"
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label>Tags (separate with space or comma):</label>
        <input
          type="text"
          name="tags"
          value={formData.tagsText}
          onChange={onChange}
          placeholder="e.g. jazz, piano, upbeat"
        />
      </div>

      <div>
        <label>Description: <br/></label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
        />
      </div>

      <button type="submit">Upload</button>
    </form>
  );
}
