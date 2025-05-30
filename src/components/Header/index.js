// import React, { useEffect } from 'react'
// import "./styles.css"
// import { auth } from '../../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { toast } from 'react-toastify';
// import userImg from "../../assets/user.svg"
// function Header() {
//   const [user, loading] = useAuthState(auth);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user) {
//       navigate("/dashboard");
//     }
//   }, [user, loading])

//   function logoutFnc() {
//     try {
//       signOut(auth).then(() => {
//         toast.success("Logged out successfully");
//         navigate("/");
//       }).catch((error) => {
//         console.log(error);
//         toast.error(error.message);
//       })
//     } catch (e) {
//       toast.error(e.message);
//     }
//   }
//   return (
//     <div className='navbar'>
//       <p className='logo'>Financely</p>
//       {user && (
//         <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
//           <img src={user.photoURL ? user.photoURL : userImg}
//             style={{ height: "1.5rem", width: "1.5rem", borderRadius: "50%" }}
//           />
//           < p className='logo link' onClick={logoutFnc}>Logout</p>
//         </div>
//       )}

//     </div >
//   )
// }

// export default Header







import React, { useEffect } from 'react'
import "./styles.css"
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg"

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  function logoutFnc() {
    try {
      signOut(auth).then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className='navbar'>
      <p className='logo'>BudgetNest</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <img
            src={
              user.photoURL
                ? user.photoURL
                : user.providerData && user.providerData[0]?.photoURL
                  ? user.providerData[0].photoURL
                  : userImg
            }
            alt="User"
            style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
            referrerPolicy="no-referrer"
          />

          <button className="logout-btn" onClick={logoutFnc}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
