import React, { useState } from 'react'
import "./styles.css"
import Input from '../input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, doc, provider, setDoc } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();


  function signupWithEmail() {
    setLoading(true);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      setLoading(false);
      return;
    }

    // Password length validation
    if (password.length <= 5) {
      toast.error("Password should be more than 5");
      setLoading(false);
      return;
    }

    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("User created successfully");
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          createDoc(user);
          navigate("/dashboard");
        })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
              toast.error("Email already exists");
            } else {
              toast.error(errorMessage);
            }
            setLoading(false);
          });
      }
      else {
        toast.error("Password and confirm password do not match");
        setLoading(false);
      }
    }
    else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  }


  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      setLoading(false);
      return;
    }

    // Password length validation
    if (password.length <= 6) {
      toast.error("Password should be more than 6");
      setLoading(false);
      return;
    }

    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          toast.success("User logged in");
          console.log(user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error("Email not found");
        });
    } else {
      toast.error("All fields mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    // create a document
    setLoading(true);

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);

      }
      catch (e) {
        toast.error(e.message);
        setLoading(false);

      }
    } else {
      // toast.error("Doc already exists");
      setLoading(false);

    }
  }


  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user);
          setLoading(false);
          createDoc(user);
          navigate("/dashboard");
          toast.success("User authenticated");

        }).catch((error) => {
          toast.error(error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          setLoading(false);
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }


  }
  return (
    <>
      {loginForm ? (
        <div className='signup-wrapper'>
          <h2 className='title'>
            Login On <span style={{ color: "var(--theme)" }}>BudgetNest</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"abcd@gmail.com"}
            />
            <Input
              type='password'
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className='p-login'>or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login using Google"} blue={true}
            />
            <p className='p-login' style={{ cursor: 'pointer' }} onClick={() => setLoginForm(!loginForm)}>
              Don't have an account? Click here
            </p>
          </form>
        </div>
      ) : (
        <div className='signup-wrapper'>
          <h2 className='title'>
            Sign Up on <span style={{ color: "var(--theme)" }}>BudgetNest</span>
          </h2>
          <form>
            <Input

              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Enter full name"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"abcd@gmail.com"}
            />
            <Input
              type='password'
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter password"}
            />
            <Input
              type='password'
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Confirm password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className='p-login'>Or</p>
            <Button onClick={googleAuth} text={loading ? "Loading..." : "Signup using Google"} blue={true} />
            <p className='p-login' style={{ cursor: 'pointer' }} onClick={() => setLoginForm(true)}>
              Already have an account? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );

}

export default SignupSigninComponent