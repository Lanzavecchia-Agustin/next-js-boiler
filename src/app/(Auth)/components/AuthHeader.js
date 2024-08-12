'use client';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '../hooks/useLogoutMutation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';

export default function AuthHeader() {
  const router = useRouter();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <div className="flex items-center justify-between ">
      <h1 className="text-3xl font-bold text-primary">Auth Header</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button onClick={handleLogout} className="text-background">
          Logout
        </Button>
      </div>
    </div>
  );
}
