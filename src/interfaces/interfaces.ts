export interface IProductData {
  id: number;
  name: string;
  price: number;
  available: number;
}
export interface IItems {
  name: string;
  id: number | string;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}
export interface IProduct {
  available: number;
  description: string;
  name: string;
  code: string;
  manufacturer: string;
  price: string;
  id: number;
  brand: {
    name: string;
  };
  model: {
    name: string;
  };
  generation: {
    name: string;
  };
}
export interface ICommets {
  review: string;
  user: {
    firstName: string;
    lastName: string;
  };
}
export interface IBasketPageData {
  count: number;
  product: {
    name: string;
    price: number;
    code: string;
    id: number;
  };
}

export interface IContactsValue {
  name?: string;
  surname?: string;
  patronymic: string;
  tel: string;
  email?: string;
}

export interface IDeliveryValue {
  house: string;
  street: string;
  city: string;
  apartment: string;
  region: string;
}
