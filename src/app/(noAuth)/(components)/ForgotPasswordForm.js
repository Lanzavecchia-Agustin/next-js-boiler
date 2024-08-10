'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export function ForgotPasswordForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  return (
    <div className="flex items-center w-11/12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <p className="text-sm text-center text-muted-foreground">
            Enter your details to receive a reset link
          </p>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    {...field}
                    className="text-foreground bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] border"
          >
            Submit
          </Button>

          <p className="text-sm text-center">
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline"
            >
              ← Back to Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
