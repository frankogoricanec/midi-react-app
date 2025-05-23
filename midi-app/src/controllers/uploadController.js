import axios from "axios";

export function handleInputChange(e, formData, setFormData) {
  const { name, value, files } = e.target;

  if (name === "file") {
    setFormData({ ...formData, file: files[0] });
  } else if (name === "tags") {
    // Just store raw text here, parse on submit
    setFormData({ ...formData, tagsText: value });
  } else {
    setFormData({ ...formData, [name]: value });
  }
}

export async function submitUpload(formData, resetForm) {
  try {
    const { name, file, tagsText, description } = formData;

    if (!file) throw new Error("File is required");

    // Parse tagsText into array by splitting on commas or spaces, filtering empty strings
    const tags = tagsText
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    data.append("tags", JSON.stringify(tags));
    data.append("description", description);

    await axios.post("/addfile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    resetForm();
    alert("File uploaded successfully.");
  } catch (err) {
    alert("Upload failed: " + err.message);
  }
}
