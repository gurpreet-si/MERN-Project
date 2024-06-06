import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const Cards = ({ item }) => {
    const { name, image, price, _id } = item;
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const location = useLocation();

    // Mock cart state (in a real application, this would be in a context or a global state)
    const [cart, setCart] = useState([]);

    // Add to cart button handler
    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menuItemId: _id,
                name,
                quantity: 1,
                image,
                price,
                email: user.email
            };
            // Simulate adding to cart by updating local state
            setCart([...cart, cartItem]);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your item has been added to the cart',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                position: 'center',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup', { state: { from: location } });
                }
            });
        }
    };

    // Heart icon click handler
    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <div className="card w-96 bg-base-90 shadow-xl relative mb-4">
            <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}
                onClick={handleHeartClick}
            >
                <FaHeart className='h-5 w-5 cursor-pointer' />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img
                        src={image}
                        alt={name}
                        className='hover:scale-105 transition-all duration-200 md:h-72'
                    />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="card-title">{name}</h2>
                </Link>
                <p>Description of the item</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold'><span className='text-red'>$</span>{price}</h5>
                    <button className="btn bg-green text-white" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Cards;
