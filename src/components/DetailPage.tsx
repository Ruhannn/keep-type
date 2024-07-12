import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../data";
import { addToCart, selectCartItems } from "../redux/features/cartSlice";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = Products.find((prod) => prod.id === parseInt(id!));
  const dispatch = useDispatch();
  // const { addToast } = useToasts();
  const cartItems = useSelector(selectCartItems);
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    // Calculate total quantity already in cart for this product
    const cartItem = cartItems.find((item) => item.id === product.id);
    const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

    if (currentQuantityInCart! >= product.availableQuantity) {
      toast.error("not available");
      return;
    }

    dispatch(addToCart(product));
    toast.success("added");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="flex flex-wrap justify-between -mx-3">
          <div className="w-full px-3 md:w-96">
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-full rounded-full"
            />
          </div>
          <div className="w-full px-3 py-4 md:w-1/2">
            <div className="py-10 mb-10 space-y-3">
              <h1 className="text-3xl font-semibold">{product.title}</h1>
              <p className="text-lg">
                Available Quantity: {product.availableQuantity}
              </p>
              <p className="text-lg">Price: ${product.price}</p>
              <p className="text-lg">Rating: {product.rating} stars</p>
              <p className="text-lg">{product.description}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.availableQuantity === 0}
              className={`btn ${
                product.availableQuantity === 0
                  ? "text-white cursor-not-allowed"
                  : ""
              }`}>
              {product.availableQuantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
