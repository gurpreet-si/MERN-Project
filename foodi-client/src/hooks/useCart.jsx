import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
  const {user} = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
        const res = await fetch('C:\Users\hpwor\OneDrive\Desktop\MERN Project\foodi-client\public\menu.json')
        return res.json();
    },
  })

return [cart, refetch]
 

}

export default useCart;