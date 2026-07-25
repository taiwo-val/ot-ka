"use client";

import { useState } from "react";

export default function DownloadButton({
  id,
}: {
  id: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    console.log("Download button clicked");
    setLoading(true);

    try {
      const response = await fetch(`/api/photos/${id}/download`, {
        method: "POST",
      });

      const text = await response.text();
console.log(text);
return;

      if (!result.success) {
        alert(result.message);
        return;
      }

      const link = document.createElement("a");
      link.href = result.image;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Refresh the page so the download count updates
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Download failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? "Downloading..." : "Download Photo"}
    </button>
  );
}