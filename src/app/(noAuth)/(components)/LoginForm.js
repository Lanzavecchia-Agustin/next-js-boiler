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

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-11/12 p-12 space-y-4 "
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

        <div>
          <Link
            href="/forgot-password"
            className="text-sm text-background hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" variant="outline" className="w-full text-primary">
          Login
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
