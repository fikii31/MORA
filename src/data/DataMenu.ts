import cappuccino from '../assets/cap.png';
import espreso from '../assets/espreso.jpg';
import matcha from '../assets/matcha.png';
import croissant from '../assets/cro.jpg';


export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'coffee' | 'food' | 'non-coffee';
}

export interface PromoData {
    id: number;
    title: string;
    description: string;
    discount: string;
    image: string;
    originalPrice?: string;
    promoPrice?: string;
}

/*Tambah List Menu*/
export const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Americano',
        description: 'A coffee drink made by mixing a shot or two of espresso with hot water',
        price: 4,
        image: espreso,
        category: 'coffee'
    },
    {
        id: 2,
        name: 'Cappuccino',
        description: 'Espresso topped with creamed or frothed milk. It\'s velvety and smooth',
        price: 5,
        image: cappuccino,
        category: 'coffee'
    },
    {
        id: 3,
        name: 'Matcha',
        description: 'A creamy blend of matcha powder with steamed milk.',
        image: matcha,
        price: 4,
        category: 'non-coffee'
    },
    {
        id: 4,
        name: 'Croissant',
        description: 'Fresh baked croissant with a golden, flaky exterior',
        price: 3.5,
        image: croissant,
        category: 'food'
    },
    {
        id: 5,
        name:'Espreso',
        description:'Single shot espreso and no another mixing.',
        price: 3,
        image: espreso,
        category:'coffee'
    },
    {
        id: 6,
        name: 'Almond Croissant',
        description : 'Fresh baked croissant with almond topping',
        price: 4,
        image: croissant,
        category:'food'
    },
];

/* Promo Data */
export const promoItems: PromoData[] = [
    {
        id: 1,
        title: 'Cappuccino Bundle',
        description: 'Buy 2 Get 1 Free on all Cappuccino beverages this week!',
        discount: '50% OFF',
        image: cappuccino,
        originalPrice: '$5.00',
        promoPrice: '$4.50'
    },
    {
        id: 2,
        title: 'Matcha Latte Special',
        description: 'Enjoy our signature Matcha Latte with a fresh pastry combo',
        discount: '30% OFF',
        image: matcha,
        originalPrice: '$6.00',
        promoPrice: '$5.30'
    },
    {
        id: 3,
        title: 'Morning Coffee Deal',
        description: 'Espresso + Fresh Croissant combo available until 11 AM',
        discount: '25% OFF',
        image: espreso,
        originalPrice: '$7.50',
        promoPrice: '$5.63'
    },
    {
        id: 4,
        title: 'Weekend Bundle',
        description: 'Complete breakfast set with Coffee, Pastry & Orange Juice',
        discount: '40% OFF',
        image: croissant,
        originalPrice: '$12.00',
        promoPrice: '$7.20'
    },
];

/*Tambah Gambar Menu */
export const gambarmenu = {
    espreso,
    cappuccino,
    matcha,
    croissant
};
