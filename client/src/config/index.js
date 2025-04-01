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
      { id: "Electronics", label: "Electronics" },
      { id: "Clothing", label: "Clothing" },
      { id: "Home & Kitchen", label: "Home & Kitchen" },
      { id: "Beauty & Health", label: "Beauty & Health" },
      { id: "Sports & Outdoors", label: "Sports & Outdoors" },
      { id: "Kids", label: "Kids" },
      { id: "Men", label: "Men" },
      { id: "Women", label: "Women" },
      { id: "Shoes", label: "Shoes" },
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
    id: "Home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "Men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "Women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "Kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "Shoes",
    label: "Shoes",
    path: "/shop/listing",
  },
  {
    id: "Electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "Clothing",
    label: "Clothing",
    path: "/shop/listing",
  },
  {
    id: "Home & Kitchen",
    label: "Home & Kitchen",
    path: "/shop/listing",
  },
  {
    id: "Beauty & Health",
    label: "Beauty & Health",
    path: "/shop/listing",
  },
  {
    id: "Sports & Outdoors",
    label: "Sports & Outdoors",
    path: "/shop/listing",
  },
];

export const productFiltersOptions = {
  category: [
    { id: "Electronics", label: "Electronics" },
    { id: "Clothing", label: "Clothing" },
    { id: "Home & Kitchen", label: "Home & Kitchen" },
    { id: "Beauty & Health", label: "Beauty & Health" },
    { id: "Sports & Outdoors", label: "Sports & Outdoors" },
    { id: "Kids", label: "Kids" },
    { id: "Men", label: "Men" },
    { id: "Women", label: "Women" },
    { id: "Shoes", label: "Shoes" },
  ],
  brand: [
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
