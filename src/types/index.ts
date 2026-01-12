export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  color: string;
}
export interface CartItem extends Product {
  quantity: number;
}
export const PRODUCTS: Product[] = [{
  id: '1',
  name: 'Cat Embroidery Bag',
  price: 24.99,
  image: "/WhatsApp_Image_2026-01-12_at_11.58.19_(1).jpg",
  description: 'Black corduroy tote with adorable trio of cats embroidery.',
  color: 'Black'
}, {
  id: '2',
  name: 'Bear Embroidery Bag',
  price: 24.99,
  image: "/WhatsApp_Image_2026-01-12_at_11.58.19.jpg",
  description: 'Teal corduroy tote featuring a cute bear design.',
  color: 'Teal'
}, {
  id: '3',
  name: 'Stitch Character Bag',
  price: 26.99,
  image: "/WhatsApp_Image_2026-01-12_at_11.58.17.jpg",
  description: 'Fan-favorite Stitch character embroidered on black corduroy.',
  color: 'Black'
}, {
  id: '4',
  name: 'Bellara Floral Bag',
  price: 24.99,
  image: "/WhatsApp_Image_2026-01-12_at_11.58.11.jpg",
  description: 'Elegant burgundy tote with custom Bellara embroidery.',
  color: 'Burgundy'
}, {
  id: '5',
  name: 'Custom Design Bag',
  price: 24.99,
  image: "/WhatsApp_Image_2026-01-12_at_11.58.18.jpg",
  description: 'Classic corduroy tote perfect for your custom ideas.',
  color: 'Cream'
}];