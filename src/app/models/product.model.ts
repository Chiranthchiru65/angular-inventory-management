export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
  supplier: string;
  imageUrl: string;
}
