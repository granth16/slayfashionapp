export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Shirt',
    description: 'premium cotton',
    price: 49.99,
    category: 'Shirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
  },
  {
    id: '2',
    name: 'Blue Denim Shirt',
    description: 'premium cotton',
    price: 59.99,
    category: 'Shirts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
  },
  {
    id: '3',
    name: 'Floral Print Shirt',
    description: 'soft blend fabric',
    price: 54.99,
    category: 'Prints',
    image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop',
  },
  {
    id: '4',
    name: 'Hawaiian Print',
    description: 'breathable cotton',
    price: 44.99,
    category: 'Prints',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
  },
  {
    id: '5',
    name: 'Textured Linen Shirt',
    description: 'pure linen',
    price: 64.99,
    category: 'Textured',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
  },
  {
    id: '6',
    name: 'Waffle Knit Shirt',
    description: 'textured cotton',
    price: 52.99,
    category: 'Textured',
    image: 'https://images.unsplash.com/photo-1598032895397-9199baf7d1d4?w=400&h=500&fit=crop',
  },
  {
    id: '7',
    name: 'Classic Check Shirt',
    description: 'premium cotton',
    price: 48.99,
    category: 'Modern Checks',
    image: 'https://images.unsplash.com/photo-1619601030694-73f4a8cde1e8?w=400&h=500&fit=crop',
  },
  {
    id: '8',
    name: 'Blue Gingham Check',
    description: 'soft cotton blend',
    price: 46.99,
    category: 'Modern Checks',
    image: 'https://images.unsplash.com/photo-1603252109612-8837858a5f6c?w=400&h=500&fit=crop',
  },
  {
    id: '9',
    name: 'Striped Oxford Shirt',
    description: 'premium oxford',
    price: 55.99,
    category: 'Trendy Stripes',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
  },
  {
    id: '10',
    name: 'Vertical Stripe Shirt',
    description: 'breathable fabric',
    price: 51.99,
    category: 'Trendy Stripes',
    image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=400&h=500&fit=crop',
  },
  {
    id: '11',
    name: 'Oversized Tee',
    description: 'soft jersey cotton',
    price: 34.99,
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=500&fit=crop',
  },
  {
    id: '12',
    name: 'Crop Top Shirt',
    description: 'trendy cotton',
    price: 39.99,
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop',
  },
  {
    id: '13',
    name: 'Black Polo Shirt',
    description: 'pique cotton',
    price: 42.99,
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
  },
  {
    id: '14',
    name: 'Henley Shirt',
    description: 'soft cotton blend',
    price: 38.99,
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop',
  },
];
