import axios from "axios";

const BASE_URL = "https://midi-backend.onrender.com";

export async function fetchAvailableTags(setTags) {
  try {
    const res = await axios.get(`${BASE_URL}/gettaglist`);
    setTags(res.data.map((item) => ({ id: item.id, name: item.tag })));
  } catch (err) {
    console.error("Failed to load tags:", err);
  }
}

export async function deleteFile(fileId, onSuccess) {
  try {
    await axios.post(`${BASE_URL}/deletefile`, { id: fileId }, {
      headers: { "Content-Type": "application/json" },
    });
    onSuccess();
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete file.");
  }
}

export async function updateFile(file, onSuccess) {
  try {
    const tags = file.tagsText
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const data = new FormData();
    data.append("id", file.id);
    data.append("name", file.name);
    data.append("file", file.file); 
    data.append("tags", JSON.stringify(tags));
    data.append("description", file.description);

    await axios.post(`${BASE_URL}/updatefile`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onSuccess();
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update file.");
  }
}




export function toggleTag(tagId, selectedTags, setSelectedTags) {
  if (selectedTags.includes(tagId)) {
    setSelectedTags(selectedTags.filter((id) => id !== tagId));
  } else {
    setSelectedTags([...selectedTags, tagId]);
  }
}

export async function submitSearch(
  selectedTags,
  searchTerm,
  setResults
) {
  try {
    const payload = {
      tags: selectedTags,
      search: searchTerm,
    };

    const res = await axios.post(`${BASE_URL}/getfiles`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    setResults(res.data);
  } catch (err) {
    console.error("Search failed:", err);
  }
}
