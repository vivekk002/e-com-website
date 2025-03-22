import React from "react";
import { BaggageClaim, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const RegisterFormControls = [
  {
    name: "username",
    Label: "Username",
    placeholder: "Enter your username",
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    Label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    Label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const LoginFormControls = [
  {
    name: "email",
    Label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    Label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const addProductsFormElements = [
  {
    name: "title",
    Label: "Title",
    placeholder: "Enter product title",
    type: "text",
    componentType: "input",
  },
  {
    name: "description",
    Label: "Description",
    placeholder: "Enter product description",
    type: "text",
    componentType: "textarea",
  },
  {
    name: "category",
    Label: "Category",
    componentType: "dropdown",
    placeholder: "Select category",
    type: "select",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "clothing", label: "Clothing" },
      { id: "home&kitchen", label: "Home & Kitchen" },
      { id: "beauty&health", label: "Beauty & Health" },
      { id: "sports&outdoors", label: "Sports & Outdoors" },
      { id: "kids", label: "Kids" },
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "shoes", label: "Shoes" },
    ],
  },
  {
    name: "brand",
    Label: "Brand",
    componentType: "dropdown",
    placeholder: "Select brand",
    type: "select",
    options: [
      { id: "Apple", label: "Apple" },
      { id: "Samsung", label: "Samsung" },
      { id: "Sony", label: "Sony" },
      { id: "LG", label: "LG" },
      { id: "Nike", label: "Nike" },
      { id: "Adidas", label: "Adidas" },
      { id: "Puma", label: "Puma" },
      { id: "Reebok", label: "Reebok" },
      { id: "Gucci", label: "Gucci" },
      { id: "Louis Vuitton", label: "Louis Vuitton" },
      { id: "Zara", label: "Zara" },
      { id: "H&M", label: "H&M" },
      { id: "Whirlpool", label: "Whirlpool" },
      { id: "KitchenAid", label: "KitchenAid" },
      { id: "Bosch", label: "Bosch" },
      { id: "GE", label: "GE" },
      { id: "L'Oréal", label: "L'Oréal" },
      { id: "Maybelline", label: "Maybelline" },
      { id: "Dove", label: "Dove" },
      { id: "Nivea", label: "Nivea" },
      { id: "Wilson", label: "Wilson" },
      { id: "Spalding", label: "Spalding" },
      { id: "Under Armour", label: "Under Armour" },
      { id: "The North Face", label: "The North Face" },
    ],
  },
  {
    name: "price",
    Label: "Price",
    componentType: "input",
    placeholder: "Enter product price",
    type: "number",
  },
  {
    name: "salePrice",
    Label: "Sale Price",
    componentType: "input",
    placeholder: "Enter sale price",
    type: "number",
  },
  {
    name: "totalStock",
    Label: "Total Stock",
    componentType: "input",
    placeholder: "Enter total stock quantity",
    type: "number",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "shoes",
    label: "Shoes",
    path: "/shop/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "clothing",
    label: "Clothing",
    path: "/shop/listing",
  },
  {
    id: "home&kitchen",
    label: "Home & Kitchen",
    path: "/shop/listing",
  },
  {
    id: "beauty&health",
    label: "Beauty & Health",
    path: "/shop/listing",
  },
  {
    id: "sports&outdoor",
    label: "Sports & Outdoor",
    path: "/shop/listing",
  },
];

export const productFiltersOptions = {
  Category: [
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "home&kitchen", label: "Home & Kitchen" },
    { id: "beauty&health", label: "Beauty & Health" },
    { id: "sports&outdoors", label: "Sports & Outdoors" },
    { id: "kids", label: "Kids" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "shoes", label: "Shoes" },
  ],
  Brand: [
    { id: "Apple", label: "Apple" },
    { id: "Samsung", label: "Samsung" },
    { id: "Sony", label: "Sony" },
    { id: "LG", label: "LG" },
    { id: "Nike", label: "Nike" },
    { id: "Adidas", label: "Adidas" },
    { id: "Puma", label: "Puma" },
    { id: "Reebok", label: "Reebok" },
    { id: "Gucci", label: "Gucci" },
    { id: "Louis Vuitton", label: "Louis Vuitton" },
    { id: "Zara", label: "Zara" },
    { id: "H&M", label: "H&M" },
    { id: "Whirlpool", label: "Whirlpool" },
    { id: "KitchenAid", label: "KitchenAid" },
    { id: "Bosch", label: "Bosch" },
    { id: "GE", label: "GE" },
    { id: "L'Oréal", label: "L'Oréal" },
    { id: "Maybelline", label: "Maybelline" },
    { id: "Dove", label: "Dove" },
    { id: "Nivea", label: "Nivea" },
    { id: "Wilson", label: "Wilson" },
    { id: "Spalding", label: "Spalding" },
    { id: "Under Armour", label: "Under Armour" },
    { id: "The North Face", label: "The North Face" },
  ],
};

export const sortByOptions = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A to Z" },
  { id: "name-desc", label: "Name: Z to A" },
];
