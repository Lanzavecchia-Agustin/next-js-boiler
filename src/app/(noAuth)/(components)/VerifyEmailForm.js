'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function VerifyEmail() {
  const email = 'mark@gmail.com';

  const handleSkip = () => {
    console.log('Skipping email verification');
  };

  const handleResend = () => {
    console.log('Resending verification email');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md ">
        <h2 className="mb-12 text-5xl font-bold text-center text-background">
          Verify your email
        </h2>
        <p className="mb-4 text-lg">We&apos;ve sent a link to your email</p>
        <p className="mb-12 text-sm text-background hover:underline">
          address: {email}
        </p>

        <Button variant="outline" className="w-full text-primary">
          Skip Now
        </Button>

        <p className="text-sm text-muted-foreground-foreground">
          Didn&apos;t receive an email?{' '}
          <Link
            href="/login"
            onClick={handleResend}
            className="text-background hover:underline"
          >
            <Button variant="link" className="text-background">
              Resend
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
