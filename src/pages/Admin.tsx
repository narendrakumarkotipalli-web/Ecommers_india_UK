import React, { useState, useEffect } from 'react';
import {
  Package, DollarSign, ShoppingCart, Search,
  Plus, Tag, Trash2, Edit3,
  LayoutDashboard, Archive, Settings, LogOut,
  X, Check, Bell, Globe, Shield
} from 'lucide-react';
import Swal from 'sweetalert2';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import './Admin.css';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Floral Shirts',
    prices: { INR: 0, GBP: 0, USD: 0 },
    originalPrices: { INR: 0, GBP: 0, USD: 0 },
    stock: 0,
    fabric: 'Cotton',
    occasion: 'Casual'
  });

  // Load products from localStorage or JSON
  useEffect(() => {
    const saved = localStorage.getItem('kavya_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(productsData as Product[]);
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('kavya_products', JSON.stringify(newProducts));
    // Trigger global update (simplified for now)
    window.dispatchEvent(new Event('productsUpdated'));
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Delete this product permanently?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = products.filter(p => p.id !== id);
        saveProducts(filtered);
        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
      }
    });
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        category: 'Floral Shirts',
        prices: { INR: 0, GBP: 0, USD: 0 },
        originalPrices: { INR: 0, GBP: 0, USD: 0 },
        stock: 0,
        fabric: 'Cotton',
        occasion: 'Casual',
        images: ['/images/shirt-1.png'],
        colors: [{ name: 'Default', hex: '#000' }],
        sizes: ['S', 'M', 'L'],
        description: 'Premium casual wear shirt.',
        detailedDescription: 'Full product details and specification...',
        features: ['Natural Fabric', 'Elegant Design']
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.prices?.INR) {
      Swal.fire({ title: 'Error', text: 'Please fill in essential details.', icon: 'error' });
      return;
    }
    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? (formData as Product) : p);
      saveProducts(updated);
      Swal.fire({ title: 'Updated!', text: 'Product updated successfully.', icon: 'success', timer: 1500, showConfirmButton: false });
    } else {
      saveProducts([...products, formData as Product]);
      Swal.fire({ title: 'Added!', text: 'Product added successfully.', icon: 'success', timer: 1500, showConfirmButton: false });
    }
    setIsModalOpen(false);
  };

  const stats = [
    { label: 'Revenue (INR)', value: '₹14.5L', icon: <DollarSign size={20} />, color: 'blue' },
    { label: 'Active Orders', value: '48', icon: <ShoppingCart size={20} />, color: 'green' },
    { label: 'Inventory Count', value: products.length.toString(), icon: <Package size={20} />, color: 'purple' },
    { label: 'Flash Deals', value: '12', icon: <Tag size={20} />, color: 'orange' },
  ];

  return (
    <div className="admin-page">
      {/* Sidebar Overlay for Mobile */}
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>KAVYA <span>ADMIN</span></h2>
            <p>v1.0.4 - Production</p>
          </div>

          <nav className="sidebar-nav">
            <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={18} /> <span>Dashboard</span>
            </button>
            <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
              <Archive size={18} /> <span>Products</span>
            </button>
            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
              <ShoppingCart size={18} /> <span>Orders</span>
            </button>
            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <Settings size={18} /> <span>Settings</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={() => window.location.href = '/kavya-clothing'}>
              <LogOut size={18} /> <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <div className="admin-title">
              <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              <p>Welcome back, Management</p>
            </div>
            <div className="admin-actions">
              <div className="search-box">
                <Search size={18} />
                <input type="text" placeholder="Search..." />
              </div>
              <button className="icon-btn-circle"><Bell size={20} /></button>
              <div className="user-pill">
                <div className="avatar">AD</div>
                <span>Super Admin</span>
              </div>
            </div>
          </header>

          <div className="admin-scroll-area">
            {activeTab === 'dashboard' && (
              <div className="dashboard-view animate-in">
                <div className="stats-header">
                  {stats.map(stat => (
                    <div key={stat.label} className="stat-card">
                      <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                      <div className="stat-data">
                        <span className="stat-label">{stat.label}</span>
                        <h2 className="stat-value">{stat.value}</h2>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dashboard-body">
                  <div className="main-panel panel">
                    <div className="panel-header">
                      <h3>Recent Activity</h3>
                    </div>
                    <div className="activity-list">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="activity-item">
                          <div className="activity-icon"><Check size={14} /></div>
                          <div className="activity-text">
                            <strong>Order #9283{i} confirmed</strong>
                            <span>Customer purchased Silk Floral Shirt</span>
                          </div>
                          <div className="activity-time">1h ago</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="side-panel panel">
                    <h3>Top Categories</h3>
                    <div className="category-stats">
                      <div className="cat-row"><span>Floral Shirts</span> <strong>75%</strong></div>
                      <div className="cat-row"><span>Linen</span> <strong>15%</strong></div>
                      <div className="cat-row"><span>Silk</span> <strong>10%</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="products-view animate-in">
                <div className="view-header">
                  <div className="view-title">
                    <h2>Inventory Management</h2>
                    <p>Manage your product catalog and stock levels</p>
                  </div>
                  <button className="btn-add" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add New Product
                  </button>
                </div>

                <div className="data-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product Info</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Price (INR)</th>
                        <th>Price (USD)</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>
                            <div className="product-cell">
                              <img src={product.images[0]} alt="" />
                              <div className="product-meta">
                                <strong>{product.name}</strong>
                                <span>ID: {product.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>{product.category}</td>
                          <td><span className="badge-live">Active</span></td>
                          <td><strong>₹{(product.prices?.INR || 0).toLocaleString()}</strong></td>
                          <td><strong>${(product.prices?.USD || Math.round((product.prices?.GBP || 0)*1.25) || 0).toLocaleString()}</strong></td>
                          <td>
                            <span className={`stock-badge ${product.stock < 5 ? 'low' : ''}`}>
                              {product.stock} units
                            </span>
                          </td>
                          <td>
                            <div className="row-actions">
                              <button onClick={() => handleOpenModal(product)}><Edit3 size={16} /></button>
                              <button onClick={() => handleDelete(product.id)} className="delete"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-view animate-in">
                <div className="empty-panel">
                  <ShoppingCart size={64} />
                  <h2>No Pending Orders</h2>
                  <p>All current orders have been processed and shipped.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-view animate-in">
                <div className="settings-grid">
                  <div className="settings-card panel">
                    <div className="card-header">
                      <Archive size={20} />
                      <h3>Store Identity</h3>
                    </div>
                    <div className="form-stack">
                      <div className="form-input">
                        <label>Store Name</label>
                        <input type="text" defaultValue="Kavya Clothing Official" />
                      </div>
                      <div className="form-input">
                        <label>Tagline</label>
                        <input type="text" defaultValue="Timeless floral shirts for modern elegance." />
                      </div>
                    </div>
                  </div>

                  <div className="settings-card panel">
                    <div className="card-header">
                      <Globe size={20} />
                      <h3>Regional Settings</h3>
                    </div>
                    <div className="form-stack">
                      <div className="form-input">
                        <label>Default Currency</label>
                        <select>
                          <option>INR (₹)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                      <div className="form-input">
                        <label>Primary Market</label>
                        <input type="text" defaultValue="India / UK" />
                      </div>
                    </div>
                  </div>

                  <div className="settings-card panel">
                    <div className="card-header">
                      <Shield size={20} />
                      <h3>Customer Support</h3>
                    </div>
                    <div className="form-stack">
                      <div className="form-input">
                        <label>Support Email</label>
                        <input type="email" defaultValue="care@kavyaclothing.com" />
                      </div>
                      <div className="form-input">
                        <label>Order Notifications</label>
                        <div className="toggle-box">
                          <input type="checkbox" defaultChecked />
                          <span>Enable Email Alerts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="settings-footer">
                  <button className="btn-save">Save All Configuration</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="modal-root">
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-container">
            <div className="modal-title-bar">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-scroller">
              <div className="modal-form">
                <div className="modal-field">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product title..."
                  />
                </div>
                <div className="modal-row">
                  <div className="modal-field">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option>Floral Shirts</option>
                      <option>Linen Collection</option>
                      <option>Silk Collection</option>
                    </select>
                  </div>
                  <div className="modal-field">
                    <label>Initial Stock</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-field">
                    <label>Price (INR)</label>
                    <input
                      type="number"
                      value={formData.prices?.INR || 0}
                      onChange={e => setFormData({ ...formData, prices: { ...formData.prices!, INR: parseInt(e.target.value) || 0 } })}
                    />
                  </div>
                  <div className="modal-field">
                    <label>Price (USD)</label>
                    <input
                      type="number"
                      value={formData.prices?.USD || 0}
                      onChange={e => setFormData({ ...formData, prices: { ...formData.prices!, USD: parseInt(e.target.value) || 0 } })}
                    />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-field">
                    <label>Original Price (Optional)</label>
                    <input
                      type="number"
                      value={formData.originalPrices?.INR}
                      onChange={e => setFormData({ ...formData, originalPrices: { ...formData.originalPrices!, INR: parseInt(e.target.value) } })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-btns">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-action" onClick={handleSave}>
                {editingProduct ? 'Update Inventory' : 'Add to Collection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
