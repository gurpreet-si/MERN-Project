import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const Profile = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        // Set default profile image URL if user.photoURL is not set
        if (!user.photoURL) {
            setProfileImage("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg");
        } else {
            setProfileImage(user.photoURL);
        }
    }, [user]);

    const handleLogout = () => {
        console.log("Logging out...");
        logout()
            .then(() => {
                console.log("Logout Successfully!");
                Swal.fire({
                    icon: 'success',
                    title: 'Logout Successful!',
                    showConfirmButton: false,
                    timer: 1500,
                    position: 'center'
                });
            })
            .catch((error) => {
                console.log("Logout Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Error',
                    text: error.message,
                    showConfirmButton: true,
                    position: 'center'
                });
            });
    };

    return (
        <div>
            <div className="drawer drawer-end z-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User Avatar" src={profileImage} />
                        </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <a href="/update-profile">Profile</a>
                        </li>
                        <li>
                            <a href="/orders">Orders</a>
                        </li>
                        <li>
                            <a href="/settings">Settings</a>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
