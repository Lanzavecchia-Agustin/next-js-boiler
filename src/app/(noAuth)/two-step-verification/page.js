import { TwoStepVerification } from '../(components)/TwoStepVerificationForm';

export default function TwoStepVerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold ">Two-step Verification</h1>
      <TwoStepVerification />
    </div>
  );
}
