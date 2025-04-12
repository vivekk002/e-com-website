import React, { useState, useEffect } from "react";
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
  Baby,
  ShirtIcon,
  Venus,
  Footprints,
  Volleyball,
} from "lucide-react";

import {
  appleLogo,
  samsungLogo,
  sonyLogo,
  lgLogo,
  nikeLogo,
  adidasLogo,
  pumaLogo,
  reebokLogo,
  gucciLogo,
  louisVuittonLogo,
  zaraLogo,
  hmLogo,
  whirlpoolLogo,
  kitchenAidLogo,
  boschLogo,
  geLogo,
  lorealLogo,
  maybellineLogo,
  doveLogo,
  niveaLogo,
  wilsonLogo,
  spaldingLogo,
  underArmourLogo,
  theNorthFaceLogo,
} from "@/assets/constant";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailDialog from "@/components/shopping-view/product-details";

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [openDeatailsDialog, setOpenDeatailsDialog] = useState(false);

  const sliderImages = [banner1, banner2, banner3];
  const categoriesWithIcons = [
    { id: "Electronics", label: "Electronics", icon: Fan },
    { id: "Clothing", label: "Clothing", icon: Shirt },
    { id: "Home & Kitchen", label: "Home & Kitchen", icon: Home },
    { id: "Beauty & Health", label: "Beauty & Health", icon: HeartHandshake },
    { id: "Sports & Outdoors", label: "Sports & Outdoors", icon: Volleyball },
    { id: "Kids", label: "Kids", icon: Baby },
    { id: "Men", label: "Men", icon: ShirtIcon },
    { id: "Women", label: "Women", icon: Venus },
    { id: "Shoes", label: "Shoes", icon: Footprints },
  ];

  const brandsWithImages = [
    { id: "Apple", label: "Apple", image: appleLogo },
    { id: "Samsung", label: "Samsung", image: samsungLogo },
    { id: "Sony", label: "Sony", image: sonyLogo },
    { id: "LG", label: "LG", image: lgLogo },
    { id: "Nike", label: "Nike", image: nikeLogo },
    { id: "Adidas", label: "Adidas", image: adidasLogo },
    { id: "Puma", label: "Puma", image: pumaLogo },
    { id: "Reebok", label: "Reebok", image: reebokLogo },
    { id: "Gucci", label: "Gucci", image: gucciLogo },
    { id: "Louis Vuitton", label: "Louis Vuitton", image: louisVuittonLogo },
    { id: "Zara", label: "Zara", image: zaraLogo },
    { id: "H&M", label: "H&M", image: hmLogo },
    { id: "Whirlpool", label: "Whirlpool", image: whirlpoolLogo },
    { id: "KitchenAid", label: "KitchenAid", image: kitchenAidLogo },
    { id: "Bosch", label: "Bosch", image: boschLogo },
    { id: "GE", label: "GE", image: geLogo },
    { id: "L'Oréal", label: "L'Oréal", image: lorealLogo },
    { id: "Maybelline", label: "Maybelline", image: maybellineLogo },
    { id: "Dove", label: "Dove", image: doveLogo },
    { id: "Nivea", label: "Nivea", image: niveaLogo },
    { id: "Wilson", label: "Wilson", image: wilsonLogo },
    { id: "Spalding", label: "Spalding", image: spaldingLogo },
    { id: "Under Armour", label: "Under Armour", image: underArmourLogo },
    { id: "The North Face", label: "The North Face", image: theNorthFaceLogo },
  ];

  // Add auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-asc",
      })
    );
  }, [dispatch, currentSlide]);

  useEffect(() => {
    if (productDetails) {
      console.log("Home: Product details fetched, opening dialog");
      setOpenDeatailsDialog(true);
    }
  }, [productDetails]);

  // Fix the prev/next functions
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const handleNavigateToListingPage = (item, type) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [type]: [item.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    console.log(
      "Home: handleGetProductDetails called with ID:",
      getCurrentProductId
    );
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user?.userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.userId));
        toast({
          title: "Product added to cart",
          description: "You can view your cart in the cart page",
          variant: "success",
        });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[900px] overflow-hidden">
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`banner-${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 z-10"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 z-10"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>

        {/* Add slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcons.map((item) => (
              <Card
                key={item.id}
                onClick={() => {
                  handleNavigateToListingPage(item, "category");
                }}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Shop by Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithImages.map((item) => (
              <Card
                key={item.id}
                onClick={() => {
                  handleNavigateToListingPage(item, "brand");
                }}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-12 h-12 mb-4"
                  />
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => {
                  return (
                    <ShoppingProductTile
                      key={productItem._id}
                      handleGetProductDetails={handleGetProductDetails}
                      handleAddToCart={handleAddToCart}
                      product={productItem}
                    />
                  );
                })
              : "No products found"}
          </div>
        </div>
      </section>
      <ProductDetailDialog
        open={openDeatailsDialog}
        setOpen={setOpenDeatailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
