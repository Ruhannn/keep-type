import { Link } from "react-router-dom";
import { Products } from "../data";
// import { addToCart, selectCartItems } from '../redux/features/cartSlice';
// import { useAppDispatch, useAppSelector } from '../redux/hook';
// TODO:ui api

const Card = () => {
  // const dispatch = useAppDispatch()
  // const cartItem = useAppSelector(selectCartItems)
  // // console.log('cart Items' ,cartItem);

  // const handleAddToCart = (item) => {
  //     dispatch(addToCart(item))
  // }

  return (
    <div className="container grid grid-cols-1 p-4 mx-auto mt-24 md:grid-cols-3 gap-9">
      {Products?.map((item) => (
        <div key={item.id} className="shadow-xl card bg-base-100 w-96">
          <figure>
            <img src={item.imgSrc} alt="Shoes" />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
            <div className="h-8 text-lg badge badge-primary">
              Price: ${item.price}
            </div>
            <div className="justify-end card-actions">
              <Link to={`/product/${item?.id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
