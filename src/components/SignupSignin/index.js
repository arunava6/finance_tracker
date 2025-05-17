import React, { useState } from 'react'
import "./styles.css"
import Input from '../input';
import Button from '../Button';

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  return (
    <div className='signup-wrapper'>
      <h2 className='title'>
        Sign Up on <span style={{ color: "var(--theme)" }}>Financly</span>
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
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Enter password"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"confirm password"}
        />
        <Button text={"Signup using Email and Password"}/>
        <p style={{textAlign:"center",margin: 0}}>Or</p>
        <Button text={"Signup using Google"} blue={true}/>
      </form>
    </div>
  )
}

export default SignupSigninComponent