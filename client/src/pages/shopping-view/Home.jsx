import React from "react";
import banner1 from "../../assets/banners/banner1.png";
import banner2 from "../../assets/banners/banner2.png";
import banner3 from "../../assets/banners/banner3.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Fan,
  Shirt,
  Home,
  HeartHandshake,
  Soccer,
  Baby,
  Male,
  Female,
  Shoe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ShoppingHome = () => {
  const sliderImages = [banner1, banner2, banner3];
  const categories = [
    { id: "electronics", label: "Electronics", icon: Fan },
    { id: "clothing", label: "Clothing", icon: Shirt },
    { id: "home&kitchen", label: "Home & Kitchen", icon: Home },
    { id: "beauty&health", label: "Beauty & Health", icon: HeartHandshake },
    { id: "sports&outdoors", label: "Sports & Outdoors", icon: Soccer },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "men", label: "Men", icon: Male },
    { id: "women", label: "Women", icon: Female },
    { id: "shoes", label: "Shoes", icon: Shoe },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[900px] overflow-hidden ">
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="banner"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-100 ease-in-out`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((item) => (
              <Card className="cursor-pointer hover:shadow-lg transition-shadow ">
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
