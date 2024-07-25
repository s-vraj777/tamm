import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/listPageStyle.css";

const ListPageComponent = ({ items, isLoading, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [sortOrder, setSortOrder] = useState("Select Order");

  const navigate = useNavigate();

  const collator = new Intl.Collator("en-US");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteClick = (name) => {
    setDeleting(name);
    setTimeout(() => {
      handleDelete(name);
      setDeleting(null);
    }, 500);
  };

  let filteredItems = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (sortOrder === "A-Z") {
    filteredItems = filteredItems.sort((a, b) =>
      collator.compare(a.name, b.name)
    );
  } else if (sortOrder === "Z-A") {
    filteredItems = filteredItems.sort((a, b) =>
      collator.compare(b.name, a.name)
    );
  }

  const handleDetailPage = (item) => {
    navigate("/details", { state: { item } });
  };

  return (
    <div>
      <div className="container">
        <h1 className="header">Universities</h1>
        <div className="controls">
          <label className="control-label">Sort</label>
          <select
            data-testid="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="Select Order">Select Order</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <table className="list">
          <thead>
            <tr>
              <th>Country</th>
              <th>Name</th>
              <th>Alpha Code</th>
              <th>Website</th>
              <th></th>
            </tr>
          </thead>

          {filteredItems.length === 0 && isLoading === false ? (
            <tr>
              <td colSpan="5" className="no-data">
                No Data Found
              </td>
            </tr>
          ) : (
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.name}
                  className={`list-item ${
                    deleting === item.name ? "fade-out" : ""
                  }`}
                >
                  <td>{item.country}</td>
                  <td
                    onClick={() => handleDetailPage(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <b>{item.name}</b>
                  </td>
                  <td>{item.alpha_two_code}</td>
                  <td>
                    <Link to={item.web_pages?.[0]}>{item.web_pages?.[0]}</Link>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(item.name)}
                      data-testid={`delete-${item.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {isLoading && <div className="loading-message">Loading...</div>}
      </div>
    </div>
  );
};

export default ListPageComponent;
