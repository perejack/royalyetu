export interface ProductSpecifications {
  gaugeOptions?: string[];
  finishOptions?: string[];
  colors?: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  specifications?: ProductSpecifications;
}