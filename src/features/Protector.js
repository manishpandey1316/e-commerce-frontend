import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./Auth/AuthSlice";
import LoginPage from "../Pages/LoginPage";
import AdminPanel from "./Admin/AdminPanel";

function Protector({children})
{
   const userId = useSelector(selectLoggedInUser)
   if(userId)
   {
      return children
   }
   
   return <LoginPage></LoginPage>
}
export default Protector