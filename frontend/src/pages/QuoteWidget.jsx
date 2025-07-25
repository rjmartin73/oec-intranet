import React, { useState, useEffect } from "react";

const QuoteWidget = ({
  refreshable = true,
  initialAuthor = null,
  layout = "default",
}) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);

    try {
      const baseURL = "http://api.quotable.io/random";
      const url = initialAuthor
        ? `${baseURL}?author=${encodeURIComponent(initialAuthor)}`
        : baseURL;
      const res = await fetch(url);
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Failed to fetch quote:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      className={`${
        layout === "compact"
          ? "p-2 bg-tranparent border-none shadow-none text-sm"
          : "p-6 border rounded-2xl shadow bg-white max-w-xl mx-auto space-y-4"
      }`}
    >
      {loading ? (
        <p className="text-gray-500 italic">Loading quote...</p>
      ) : (
        <>
          <p
            className={`${
              layout === "compact" ? "text-base" : "text-xl"
            } font-semibold text-gray-800"`}
          >
            "{quote.content}"
          </p>
          <p
            className={`text-right ${
              layout === "compact" ? "text-gray-500 text-xs" : "text-gray-600"
            }`}
          >
            — {quote.author}
          </p>
          {initialAuthor && (
            <p className="text-sm text-gray-400 text-right italic">
              Quotes by {initialAuthor}
            </p>
          )}
        </>
      )}
      {refreshable && (
        <button
          onClick={fetchQuote}
          disabled={loading}
          className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Fetching..." : "Get New Quote"}
        </button>
      )}
    </div>
  );
};

export default QuoteWidget;
