import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function searchPosts(searchTerm) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data);
        });
    }

    if (searchTerm) {
      searchPosts(searchTerm);
    }
  }, [searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
