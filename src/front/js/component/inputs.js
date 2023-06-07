// import React, { useState, useContext } from "react";
// import { Context } from "../store/appContext";


// export const Input = () => {

//     const {store, actions} = useContext(Context);
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const handleSignUp = () => {
//         actions.signUp(email, password)
//     }

//     return (
//         <>
//             <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
//             <button onClick={() => {handleSignUp()}}>sign up</button>
//         </>
//     )
// }