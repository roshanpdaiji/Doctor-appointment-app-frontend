import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function Login() {
  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />

      <form className="min-h-[-80vh] flex items-center mb-5 mt-5">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-bold">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className="font-semibold">
            Please {state === 'Sign Up' ? 'Sign Up' : 'login'} to book an appointment
          </p>

          {state === 'Sign Up' && (
            <div className="w-full">
              <p className="font-semibold">Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="w-full">
            <p className="font-semibold">Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p className="font-semibold">Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button className="bg-dark text-white font-bold w-full py-2 rounded-md text-base">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
          {state === 'Sign Up' ? (
            <p className="font-semibold">
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="font-bold">
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
}

export default Login;
