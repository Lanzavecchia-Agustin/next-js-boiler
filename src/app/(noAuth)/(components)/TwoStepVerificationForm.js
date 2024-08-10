'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

export function TwoStepVerification() {
  // State to store the OTP input values as an array of characters
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);

  // Function to handle OTP verification
  const handleVerify = () => {
    console.log('OTP:', otp.join(''));
    // Add logic here to verify the OTP, such as making an API call
  };

  // Function to handle resending the OTP code
  const handleResend = () => {
    console.log('Resend code');
    // Add logic here to resend the OTP, such as making an API call
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 text-center">
        <p className="mt-4 text-sm text-muted-foreground">
          We sent a verification code to your email. Enter the code from the
          email in the field below.
        </p>

        <div className="flex items-center justify-center">
          {/* InputOTP component to handle the OTP input, with a pattern to restrict allowed characters */}
          <InputOTP
            maxLength={6} // Maximum length of the OTP
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS} // Restrict input to digits and specific characters
            onChange={(value) => setOtp(value)} // Update OTP state on change
          >
            {/* Group for the first 3 OTP slots */}
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            {/* Separator between the two groups of OTP slots */}
            <InputOTPSeparator />

            {/* Group for the last 3 OTP slots */}
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Button to trigger OTP verification */}
        <Button
          onClick={handleVerify}
          variant="outline"
          className="w-full text-primary"
        >
          Verify my account
        </Button>

        <p className="text-sm text-muted-foreground">
          Haven't received it? {/* Link to trigger resending the OTP code */}
          <Link
            href="#"
            onClick={handleResend}
            className="text-background hover:underline"
          >
            Resend a new code
          </Link>
        </p>
      </div>
    </div>
  );
}
