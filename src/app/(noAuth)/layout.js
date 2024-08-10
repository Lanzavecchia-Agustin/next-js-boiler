import AuthHeader from './(components)/AuthHeader';

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full p-4 text-primary-foreground">
        <AuthHeader />
      </div>
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="flex items-center justify-center w-full h-4/6 md:w-1/2 bg-background">
          <h2 className="text-5xl font-bold">Welcome</h2>
        </div>
        <div className="flex items-center justify-center w-full h-full md:w-1/2 bg-foreground">
          <main className="w-full max-w-md text-background">{children}</main>
        </div>
      </div>
    </div>
  );
}
