import React, { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthProvider';

const CartPage = () => {
  const { user } = useContext(AuthContext);

  // Initial cart items (simulating fetched data) with quantity added
  const [cartItems, setCartItems] = useState([
    {
      "_id": "642c155b2c4774f05c36eeb7",
      "name": "Fish Parmentier",
      "recipe": "Sautéed breaded veal escalope with watercress, lemon and veal jus.",
      "image": "/images/recipes/img1.png",
      "category": "soup",
      "price": 9.5,
      "quantity": 1
  },
    {
      "_id": "642c155b2c4774f05c36ee712",
      "name": "Roast Duck Breast",
      "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
      "image": "/images/recipes/img1.png",
      "category": "popular",
      "price": 14.5,
      "quantity": 1
    },
    {
      "_id": "642c155b2c4774f05c36eea0",
      "name": "Roasted Pork Belly",
      "recipe": "Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing",
      "image": "/images/recipes/img3.png",
      "category": "pizza",
      "price": 14.5,
      "quantity" : 1
  },

    // Add more items as needed
  ]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = (item) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCart);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      alert("Item quantity can't be zero");
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  };

  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubtotal;

  return (
    <div className='section-container'>
      {/* banner */}
      <div className='bg-gradient-to-r from-[#FAFAA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col items-center justify-center gap-8'>
          <div className='space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Items Added to The <span className='text-green'>Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      <div>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead className='bg-green text-white rounded-sm'>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className='flex items-center gap-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-12 h-12'>
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='font-medium'>{item.name}</td>
                  <td>
                    <button className='btn btn-xs mt-6' onClick={() => handleDecrease(item)}>
                      -
                    </button>
                    <input
                      type='number'
                      value={item.quantity}
                      readOnly
                      className='w-10 mx-2 text-center overflow-hidden appearance-none'
                    />
                    <button className='btn btn-xs mt-6' onClick={() => handleIncrease(item)}>
                      +
                    </button>
                  </td>
                  <td>${calculatePrice(item).toFixed(2)}</td>
                  <td>
                    <button className='btn btn-ghost text-red btn-xs' onClick={() => handleDelete(item)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* customer details */}
      <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='text-lg font-semibold'>Customer Details</h3>
          <p>Name: {user?.displayName || 'None'}</p>
          <p>Email: {user?.email}</p>
          <p>
            User_id: <span className='text-sm'>{user?.uid}</span>
          </p>
        </div>
        <div className='md:w-1/2 md:ml-auto space-y-3'>
          <h3 className='text-lg font-semibold'>Shopping Details</h3>
          <p>Total Items: {cartItems.length}</p>
          <p>Total Price: ${orderTotal.toFixed(2)}</p>
          <button className='btn btn-md bg-green text-white px-8 py-1'>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
