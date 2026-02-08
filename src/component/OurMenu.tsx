import './OurMenu.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuItems } from '../data/DataMenu'


interface OrderForm {
    name: string;
    nomeja: number;
    phone: number;
    quantity: number;
    menuItem: string;
}

function OrderModal({ isOpen, onClose, menuItem }: { isOpen: boolean; onClose: () => void; menuItem: string }) {
    const [formData, setFormData] = useState<OrderForm>({
        name: '',
        nomeja: 1,
        phone: +62,
        quantity: 1,
        menuItem: menuItem
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Order submitted:', formData);
        alert(`Order atas nama:${formData.name} dengan no meja: ${formData.nomeja}, telah dikirim!`);
        onClose();
        setFormData({
            name: '',
            nomeja: 0,
            phone: +62,
            quantity: 1,
            menuItem: menuItem
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Order {menuItem}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="form-group">
                        <label htmlFor="name">Nama:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Masukkan nama Anda"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nomeja">No Meja:</label>
                        <input
                            type="tel"
                            id="nomeja"
                            name="nomeja"
                            value={formData.nomeja}
                            onChange={handleInputChange}
                            min="1"
                            placeholder="Masukkan No.Meja"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">No. Telepon:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Masukkan nomor telepon"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Jumlah:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder='Masukan jumlah pesanan'
                            min="1"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn-submit">Pesan Sekarang</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const Ourmenu = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'coffee' | 'food' | 'non-coffee'>('all');

    const handleOrderClick = (menuName: string) => {
        setSelectedMenu(menuName);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMenu('');
    };

    // Filter menu berdasarkan category yang dipilih
    const filteredMenu = selectedCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === selectedCategory);

    return(
        
       <section className="Seemenu-fullpage">
        <div className="menu-header">
            <button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button>
        </div>
        <section className="Seemenu" id="OurMenu">
            <h2 className="Seemenu-title">All Menu</h2>
            <p className='Seemenu-description'>Choose your favorite menu and order now...</p>
            
            {/* Category Filter */}
            <div className="category-filter">
                <button 
                    className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All
                </button>
                <button 
                    className={`category-btn ${selectedCategory === 'coffee' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('coffee')}
                >
                    Coffee
                </button>
                <button 
                    className={`category-btn ${selectedCategory === 'non-coffee' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('non-coffee')}
                >
                    Non-Coffe
                </button>
                <button 
                    className={`category-btn ${selectedCategory === 'food' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('food')}
                >
                    Bakery
                </button>
            </div>

            <div className='Menu-grid'>
                {filteredMenu.map((item) => (
                    <div key={item.id} className="menu-card">
                        {item.image && <img src={item.image} alt={item.name} className="menu-image" />}
                        <h3 className="namemenu">{item.name}</h3>
                        <p className="desc-menu">{item.description}</p>
                        <p className="price-menu">${item.price}</p>
                        <button className="Order" onClick={() => handleOrderClick(item.name)}>ORDER NOW</button>
                    </div>
                ))}
            </div>
        </section>
        <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} menuItem={selectedMenu} />
       </section>
    )
};
    export default Ourmenu;
