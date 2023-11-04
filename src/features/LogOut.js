import { useEffect } from "react";
import { fetchSignOutUserAsync} from "./Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./Auth/AuthSlice";
import { Navigate } from "react-router-dom";

export default function LogOut() {

  const userId = useSelector(selectLoggedInUser);
  const dispatch=useDispatch()
  useEffect(() => {
   dispatch(fetchSignOutUserAsync())
  }, [dispatch]);

  return (
    <>
       {
         (!userId)?<Navigate  to="/login" replace={true}></Navigate>:null
       }
    </>
  );
}
