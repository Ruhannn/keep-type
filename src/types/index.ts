export interface Product {
  id: number;
  category: string;
  title: string;
  imgSrc: string;
  description: string;
  price: number;
  availableQuantity: number;
  rating: number;
  quantity?: number;
}

export interface CartState {
  items: Product[];
  totalPrice: number;
  isProductInStock: boolean;
}
