import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./Auth/AuthSlice";
import LoginPage from "../Pages/LoginPage";


function AdminProtector({children})
{
  
   const userId = useSelector(selectLoggedInUser)
   if(userId && userId.role==="admin")
   {
      return children
   }
   
   return <LoginPage></LoginPage>
}
export default AdminProtector