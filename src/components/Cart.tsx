import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  setStockStatus,
  updateQuantity,
} from "../redux/features/cartSlice";
import { useAppSelector } from "../redux/hook";
import { useEffect } from "react";
import QuantitySelector from "./QuantitySelector";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  const totalPrice = useAppSelector(selectCartTotal);
  // const isProductInStock = useAppSelector(selectStockStatus);

  useEffect(() => {
    const isInStock = cartItems.every(
      (item) => item.quantity! <= item.availableQuantity
    );
    dispatch(setStockStatus(isInStock));
  }, [cartItems, dispatch]);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="container mx-auto mt-10 ">
      <div className="my-10 shadow-md sm:flex ">
        <div className="w-full px-10 py-10 sm:w-3/4">
          <div className="flex justify-between pb-8 border-b">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <h2 className="text-2xl font-semibold">
              {cartItems?.length} Items
            </h2>
          </div>

          {/* items */}
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="items-stretch py-8 border-t md:flex md:py-10 lg:py-8 border-gray-50">
              <div className="w-full md:w-4/12 2xl:w-1/4">
                <img
                  src={item.imgSrc}
                  alt="Black Leather Purse"
                  className="hidden object-cover object-center h-full md:block"
                />
                <img
                  src={item.imgSrc}
                  alt="Black Leather Purse"
                  className="object-cover object-center w-full h-full md:hidden"
                />
              </div>
              <div className="flex flex-col justify-center md:pl-3 md:w-8/12 2xl:w-3/4">
                <p className="pt-4 text-xs leading-3 md:pt-0">RF293</p>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-black leading-none ">
                    {item.title}
                  </p>
                  {/* <input
                                        type="number"
                                        min="1"
                                        max={item.availableQuantity}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="px-1 py-2 mr-6 border border-gray-200 focus:outline-none"
                                    /> */}
                  <QuantitySelector
                    id={item.id}
                    availableQuantity={item.availableQuantity}
                    quantity={item.quantity ?? 0}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
                <p>{item.description}</p>
                <div className="pt-5 ">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-white bg-red-500 cursor-pointer btn btn-error">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-10">
            <Link to="/" className="flex text-sm font-semibold text-indigo-600">
              <svg
                className="w-4 mr-2 text-indigo-600 fill-current"
                viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="pl-5 text-xs leading-3 text-red-500 underline cursor-pointer">
              {cartItems.length ? "Clear Cart" : ""}
            </button>
          </div>
        </div>

        {/* order section */}
        <div id="summary" className="w-full px-8 py-10 sm:w-1/4 md:w-1/2">
          <h1 className="pb-8 text-2xl font-semibold border-b">
            Order Summary
          </h1>
          {cartItems.length > 0 ? (
            <div className="sticky top-0 p-3">
              <div className="flex justify-between mt-10 mb-5 ">
                <span className="text-sm font-semibold uppercase">
                  Items {cartItems.length}
                </span>
                <span className="text-lg font-semibold">${totalPrice}</span>
              </div>
              <div>
                <label className="inline-block mb-3 text-sm font-medium uppercase">
                  Shipping
                </label>
                <select className="block w-full p-2 text-sm text-gray-600">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label className="inline-block mb-3 text-sm font-semibold uppercase">
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="w-full p-2 text-sm"
                />
              </div>
              <button className="text-white uppercase bg-red-500 cursor-pointer btn btn-error hover:bg-red-600">
                Apply
              </button>
              <div className="mt-8 border-t">
                <div className="flex justify-between py-6 text-lg font-semibold uppercase">
                  <span>Total cost</span>
                  <span>${totalPrice}</span>
                </div>
                <button
                  className={`bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full`}
                  onClick={() => {
                    /* Handle checkout logic */
                  }}>
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">Your cart is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
