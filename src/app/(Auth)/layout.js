import AuthHeader from './components/AuthHeader';

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full p-4 text-primary-foreground">
        <AuthHeader />
      </div>
      <div className="flex flex-grow md:flex-row">
        <div className="flex items-center justify-center w-full h-full bg-foreground">
          <main className="text-background">{children}</main>
        </div>
      </div>
    </div>
  );
}
