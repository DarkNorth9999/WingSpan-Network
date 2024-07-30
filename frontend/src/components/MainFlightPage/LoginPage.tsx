"use client";
import React, { useState } from "react";
import { Label } from "../ui/Form/Label";
import { Input } from "../ui/Form/Input";
import { cn } from "../../utils/cn";
import axiosInstance from "@/utils/axios";


export default function LoginAndSignUp({isLoggedIn, setIsLoggedIn, setUsername}) {

  const [toggleLogin, setToggleLogin] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      phone: formData.get('phone-number'),
      password: formData.get('password'),
    };
    console.log('data: ', data)

    const body = {
      username: `${data.firstname} ${data.lastname}`,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axiosInstance.post(`${API_URL}/auth/register`, body);

      const result = response.data;
      if (response.status==200) {
        console.log('Registration successful:', result);
        localStorage.setItem('token', result.access_token)
        localStorage.setItem('username', result.username)
        setIsLoggedIn(true)
        setUsername(result.username)
        
      } else {
        throw new Error(result.message || 'Failed to register');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    const formData = new URLSearchParams();
    formData.append('username', form.get('username'));
    formData.append('password', form.get('password'));

    console.log('login params', form.get('username'),' ', form.get('password'))

    try {
      const response = await axiosInstance.post('/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      const result = response.data;
      if (response.status==200) {
        console.log('Login successful:', result);
        localStorage.setItem('token', result.access_token)
        localStorage.setItem('username', result.username)
        setUsername(result.username)
        setIsLoggedIn(true)
      }

    } catch (error) {
        console.error('Login error:', error.response ? error.response.data.detail : 'Unknown error');
    }
  }

  return (
    <>
    {!isLoggedIn &&
    <>
    {!toggleLogin && <SignUpForm handleSubmit={handleSubmit} setToggleLogin={setToggleLogin}/>}
    {toggleLogin && <LoginForm handleLogin={handleLogin} setToggleLogin={setToggleLogin} />}
    </> }
      
    </>
  );
}

const LoginForm = ({handleLogin, setToggleLogin})=>{
  return <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to WingSpan!
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      Login in to track flights, receive notifications and so much more!
      </p>

      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Username</Label>
          <Input id="username" placeholder="yash31" type="text" name="username"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password"/>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              New Member? <span onClick={()=>setToggleLogin(false)} className="text-blue-700 hover:text-blue-500">Join Now</span>
            </span>
            <BottomGradient />
          </button>
          
        </div>
      </form>
    </div>
}

const SignUpForm = ({handleSubmit, setToggleLogin})=>{
  return <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to WingSpan!
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to track flights, receive notifications and so much more!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Yash" type="text" name="firstname" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Aggarwal" type="text" name="lastname"/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="yashaggarwal@indigo.com" type="email" name="email"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            placeholder="+91XXXXXXXXXX"
            type="number"
            name='phone-number'
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Already a member? <span className="text-blue-700 hover:text-blue-500" onClick={()=>setToggleLogin(true)}>Login</span>
            </span>
            <BottomGradient />
          </button>
          
        </div>
      </form>
    </div>
}



const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
