import React, { useState, useEffect } from "react";
import UploadView from "./components/UploadView";
import SearchView from "./components/SearchView";
import {
  handleInputChange,
  submitUpload,
} from "./controllers/uploadController";
import {
  fetchAvailableTags,
  toggleTag,
  submitSearch,
} from "./controllers/searchController";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("upload");

  const [formData, setFormData] = useState({
    name: "",
    file: null,
    tagsText: "",
    description: "",
  });

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (activeTab === "search") {
      fetchAvailableTags(setTags);
    }
  }, [activeTab]);

  const onUploadChange = (e) =>
    handleInputChange(e, formData, setFormData);

  const onUploadSubmit = (e) => {
    e.preventDefault();
    submitUpload(formData, () =>
      setFormData({ name: "", file: null, tagsText: "", description: "" })
    );
  };

  const onSearchInputChange = (e) => setSearchTerm(e.target.value);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    submitSearch(selectedTags, searchTerm, setResults);
  };
  const onTagToggle = (id) =>
    toggleTag(id, selectedTags, setSelectedTags);

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab("upload")}>Upload</button>
        <button onClick={() => setActiveTab("search")}>Search</button>
      </nav>

      {activeTab === "upload" && (
        <UploadView
          formData={formData}
          onChange={onUploadChange}
          onSubmit={onUploadSubmit}
        />
      )}

      {activeTab === "search" && (
<SearchView
  tags={tags}
  selectedTags={selectedTags}
  searchTerm={searchTerm}
  onInputChange={onSearchInputChange}
  onTagToggle={onTagToggle}
  onSubmit={onSearchSubmit}
  results={results}
  setResults={setResults}
/>

      )}
    </div>
  );
}
