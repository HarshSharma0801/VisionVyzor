"use client";

// components/FileUpload.tsx
import { useState } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();

      if (fileExtension !== "pdf") {
        setError("Please upload a PDF file.");
        setFile(null);
      } else if (fileSizeMB > 50) {
        setError("File size must be 50MB or less.");
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace with your upload URL or API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full  justify-center items-center gap-4">
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="border-2 border-gray-300 rounded p-2"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {file && (
          <div className="text-center">
            <span className="font-medium">{file.name}</span>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`px-6 py-2 rounded text-white font-semibold ${
            uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
