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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

import { useSignupMutation } from '../(hooks)/useSignupMutation'; // Import the useSignupMutation hook

// Define the form validation schema using Zod
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm Password must be at least 6 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export function SignupForm() {
  // Initialize the form with react-hook-form and Zod schema validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  // Destructure the mutate function and other state variables from useSignupMutation hook
  const { mutate: signup, isLoading, error } = useSignupMutation();

  // Handle form submission
  const onSubmit = (data) => {
    // Call signup function with form data
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'Admin', // Adjust the role as needed for your application logic (Admin, User)
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-11/12 p-12 space-y-4 text-background"
      >
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  className="text-background bg-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  {...field}
                  className="text-background bg-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  className="text-background bg-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  className="text-background bg-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display error message if registration fails */}
        {error && (
          <p className="text-sm text-red-500">
            {error.response?.data?.message ||
              'Registration failed. Please try again.'}
          </p>
        )}

        {/* Submit button with loading state */}
        <Button
          type="submit"
          variant="outline"
          className="w-full text-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </Button>

        {/* Link to the login page for existing users */}
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login">
            <Button variant="link" className="text-background">
              Login
            </Button>
          </Link>
        </p>
      </form>
    </Form>
  );
}
