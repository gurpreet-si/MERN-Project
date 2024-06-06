import React, { useContext, useState } from 'react'
import{Link, useLocation, useNavigate} from "react-router-dom"
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';

const Modal = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError
    } = useForm();
  
    const { signUpWithGmail, login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
  
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
  
    const onSubmit = (data) => {
      const email = data.email;
      const password = data.password;
  
      if (!email || !password) {
        setError("generic", { message: "You did not log in!" });
        return;
      }
  
      login(email, password)
        .then((result) => {
          alert("Login successful");
          document.getElementById('my_modal_5').close();
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setErrorMessage("Provide a correct email and password!");
        });
    };
  
    const handleLogin = () => {
      signUpWithGmail()
        .then((result) => {
          alert("Login successful!");
          document.getElementById('my_modal_5').close();
          navigate(from, { replace: true });
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action flex flex-col justify-center mt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
              <h3 className='font-bold text-lg'>Please Login!</h3>
              
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
  
              {/* password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
  
              {/* error */}
              {errors.generic && <p className='text-red-500 text-xs font-bold'>{errors.generic.message}</p>}
              {errorMessage && <p className='text-red-500 text-xs font-bold'>{errorMessage}</p>}

                {/* login btn */}
                    <div className="form-control mt-4">
                        <input type="submit" value="Login" className="btn bg-green text-white"/>
                    </div>
                    <p className='text-center my-2'>Don't have an Account? <Link to= "/signup" 
                    className='underline text-green ml-1'> Signup Now</Link>
                    </p>
                        <button
                        htmlFor="my_modal_5"
                        onClick={()=>document.getElementById('my_modal_5').close()} 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                        </button>

                </form>
                
                {/* social sign in */}
                <div className='text-center space-x-3 mb-5'>
                    <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
                        <FaGoogle/>
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaFacebookF/>
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGithub/>
                    </button>
                </div>
            </div>
        </div>
    </dialog>
  )
}

export default Modal