import React from 'react';
import { LoginForm } from '../(components)/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-10 text-3xl font-bold">Login</h1>
      <LoginForm />
    </div>
  );
}
