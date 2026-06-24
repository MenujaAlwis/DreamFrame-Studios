import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import EditPortfolioModal from './EditPortfolioModal';
import './adminPortfolioList.css';

const AdminPortfolioList = () => {
  const { token } = useAuth();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

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

  return (
    <div className="admin-list">
      <h2>Manage Portfolios</h2>

      <div className="admin-grid">
        {items.map((item) => (
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
        ))}
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