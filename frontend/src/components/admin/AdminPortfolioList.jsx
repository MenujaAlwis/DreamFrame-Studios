import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import EditPortfolioModal from './EditPortfolioModal';
import './adminPortfolioList.css';

const AdminPortfolioList = () => {
  const { token } = useAuth();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = async () => {
    const res = await axios.get('http://localhost:5000/api/portfolio');
    setItems(res.data.items || []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/portfolio/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    loadItems();
  };

  return (
    <div className="admin-list">
      <h2>Manage Portfolios</h2>

      <div className="admin-grid">
        {items.map((item) => (
          <div key={item._id} className="admin-card">
            <img src={item.coverImage?.url} />

            <div className="admin-info">
              <h3>{item.title}</h3>
              <p>{item.category}</p>

              <div className="admin-actions">
                <button onClick={() => setSelectedItem(item)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
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
    </div>
  );
};

export default AdminPortfolioList;