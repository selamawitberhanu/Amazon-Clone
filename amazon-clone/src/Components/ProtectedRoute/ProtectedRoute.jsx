import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  
  const navigate = useNavigate();
    const { state , dispatch} = useContext(DataContext);
     
    const { user } = state;
     
   useEffect(()=> {
   if (!user) {
       navigate("/auth",{state:{msg, redirect}});
   }
     },[user]);
  //   return children
     //}

  
  // if (!state.user) {
  //   // alert(msg || "You must be logged in.");
  //   return <Navigate to="/auth" replace />;
  // }



  return children; // ✅ Just return the child directly
};

export default ProtectedRoute;
