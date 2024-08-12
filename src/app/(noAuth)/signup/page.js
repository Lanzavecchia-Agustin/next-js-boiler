import { SignupForm } from '../(components)/SignUpForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-10 text-3xl font-bold">Sign up</h1>
      <SignupForm />
    </div>
  );
}
