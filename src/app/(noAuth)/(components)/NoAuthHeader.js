import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function NoAuthHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold text-primary"> No Auth Header</h1>
      <ThemeToggle />
    </div>
  );
}
