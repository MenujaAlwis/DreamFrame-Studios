import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import EditPortfolioModal from './EditPortfolioModal';
import './AdminPortfolioList.css';

const AdminPortfolioList = () => {
  const { token } = useAuth();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const loadItems = async () => {
    const res = await axios.get('http://localhost:5000/api/portfolio');
    setItems(res.data.items || []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const confirmDelete = async () => {
    if (!deleteItem) return;

    await axios.delete(
      `http://localhost:5000/api/portfolio/${deleteItem._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setDeleteItem(null);
    loadItems();
  };

  const categories = [
    'wedding',
    'pre-shoot',
    'portrait',
    'event',
    'commercial',
  ];

  const filteredItems = items.filter((item) => {
    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !query ||
      item.title?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-list portfolio-list">
      <h2>Manage Portfolios</h2>

      <div className="admin-toolbar">
        <div className="toolbar-search">
          <svg
            className="toolbar-search-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="toolbar-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join('-')}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-grid">
        {filteredItems.length === 0 ? (
          <p className="empty-state">No portfolio items match your search.</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item._id} className="admin-card">

              <div className="menu-wrapper">
                <button
                  className="menu-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === item._id ? null : item._id);
                  }}
                >
                  ⋮
                </button>

                {openMenuId === item._id && (
                  <div className="dropdown-menu">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        setOpenMenuId(null);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteItem(item);
                        setOpenMenuId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <img src={item.coverImage?.url} />

              <div className="admin-info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>

            </div>
          ))
        )}
      </div>

      {selectedItem && (
        <EditPortfolioModal
          item={selectedItem}
          token={token}
          onClose={() => setSelectedItem(null)}
          onUpdated={loadItems}
        />
      )}

      {deleteItem && (
        <div
          className="delete-modal-overlay"
          onClick={() => setDeleteItem(null)}
        >
          <div
            className="delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Portfolio?</h3>
            <p>This action cannot be undone.</p>

            <div className="delete-actions">
              <button onClick={() => setDeleteItem(null)}>
                Cancel
              </button>
              <button onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioList;