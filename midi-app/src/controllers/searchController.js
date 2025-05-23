import axios from "axios";

export async function fetchAvailableTags(setTags) {
  try {
    const res = await axios.get("/gettaglist");
    setTags(res.data.map(([id, name]) => ({ id, name })));
  } catch (err) {
    console.error("Failed to load tags:", err);
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

    const res = await axios.post("/getfiles", payload, {
      headers: { "Content-Type": "application/json" },
    });

    setResults(res.data); // expected format: [{ name, description, tags: [...], ... }]
  } catch (err) {
    console.error("Search failed:", err);
  }
}
