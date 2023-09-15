import React, { useState } from 'react'
import './styles.css';
import Input from '../Input'
import Button from '../Button';
import { createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
   signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth, provider,db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDefaultNormalizer } from '@testing-library/react';

function SignupSignin() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("ConfirmPassword", confirmPassword);
    // Authenticate the user or create the new account using email and password

    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User', user);
            toast.success("User Created")
            setLoading(false)
            setConfirmPassword("")
            setEmail('')
            setName('')
            setPassword('')
            createDoc(user)
            navigate("/dashboard");

            // create a document with user id as the following id

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false)

            // ..
          });
      }
      else {
        toast.error("Password and Confirm Password don't match")
        setLoading(false);
      }

    }
    else {
      toast.error("All fields are Mandatory");
      setLoading(false)
    }
  }

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("password", password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In")
          console.log("User Logged In", user);
          setLoading(false)
          navigate("/dashboard");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false)

          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are Mandatory");
      setLoading(false)

    }
  }

  async function createDoc(user) {
    setLoading(true)

    // make sure that doc with uId doesn't exist
    //create a doc
    // user object contain the uid and all the necesary details
    if (!user) return;
    const useRef = doc(db, "users", user.uid)
    const userData = await getDoc(useRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        })
        toast.success("Doc created")
        setLoading(false)

      }
      catch (e) {
        toast.error(e.message)
        setLoading(false)

      }

    }
    else {
      toast.error("Doc already exists")
      setLoading(false)

    }

  }

  function googleAuth(){
    setLoading(true)
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User", user);
        createDoc(user)
        setLoading(false)

        navigate("/dashboard")
        toast.success("User Authenticated")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setLoading(false)

        const errorMessage = error.message;
        toast.error(errorMessage)
        
      });
    }
    catch(e){
toast.error(e.message)
setLoading(false)

    }
   
  }

  return (
    <>
      {loginForm ? (

        <div className='signup-wrapper'>
          <h2 className='title'>
            Login on <span style={{ color: 'var(--theme' }}>
              Financely.</span>
          </h2>
          <form>
            <Input
              type='email'
              label={'Email'}
              state={email}
              setState={setEmail}
              placeholder={'JohnDoe@gmail.com'} />
            <Input
              type="password"
              label={'Password'}
              state={password}
              setState={setPassword}
              placeholder={'Example123'} />
            <Button
              disabled={loading}

              text={loading ? "Loading..." :
                "Login Using Email and Password"}
              onClick={loginUsingEmail} />
            <p className='p-login'>or</p>
            <Button 
            onClick={googleAuth}
            text={loading ? "Loading..." : ' Login Using Google'} blue={true} />
            <p className='p-login'
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}>
              Or Don't An account Already? Click here </p>

          </form>



        </div>
      ) : (
        <div className='signup-wrapper'>
          <h2 className='title'>
            Sign Up on <span style={{ color: 'var(--theme' }}>
              Financely.</span>
          </h2>
          <form>
            <Input
              label={'Full Name'}
              state={name}
              setState={setName}
              placeholder={'John Doe'} />
            <Input
              type='email'
              label={'Email'}
              state={email}
              setState={setEmail}
              placeholder={'JohnDoe@gmail.com'} />
            <Input
              type="password"
              label={'Password'}
              state={password}
              setState={setPassword}
              placeholder={'Example123'} />
            <Input
              type="password"
              label={'Confirm Password'}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={'Example123'} />


            <Button
              disabled={loading}

              text={loading ? "Loading..." :
                "Signup Using Email and Password"}
              onClick={signupWithEmail} />
            <p className='p-login'>or</p>
            <Button 
            onClick={googleAuth}
            text={loading ? "Loading..." : 'Sign Up Using Google'} blue={true} />
            <p className='p-login'
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}>
              Or Have An Account Already? Click Here</p>


          </form>



        </div>
      )}
    </>
  )
}

export default SignupSignin