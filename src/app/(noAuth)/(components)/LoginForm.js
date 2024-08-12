'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLoginMutation } from '../(hooks)/useLoginMutation';

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

// Define the validation schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { mutate: login, isLoading, error } = useLoginMutation(); // Use the useLogin hook

  const onSubmit = (data) => {
    login(data); // Trigger the login mutation with form data
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-11/12 p-12 space-y-4"
      >
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
                  className="bg-primary text-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  className="bg-primary text-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display an error message if login fails */}
        {error && (
          <p className="text-sm text-red-500">
            {error.response?.data?.message || 'Login failed. Please try again.'}
          </p>
        )}

        <div>
          <Link
            href="/forgot-password"
            className="text-sm text-background hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="outline"
          className="w-full text-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup">
            <Button variant="link" className="text-background">
              Sign up
            </Button>
          </Link>
        </p>
      </form>
    </Form>
  );
}
