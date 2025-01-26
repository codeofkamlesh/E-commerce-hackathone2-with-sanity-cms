export interface Product {
  title: string; // Changed to string since ReactI18NextChildren is not needed
  _id: string;
  description: string;
  price: number;
  priceWithoutDiscount?: number;
  imageUrl: string;
  badge?: string;
  inventory: number;
  tags: string[];
  slug: {
    _type: "slug";
    current: string;
  };
  // category: {
  //   _id: string;
  //   title: string;
  // };
}

