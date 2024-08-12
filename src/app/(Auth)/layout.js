import AuthHeader from './components/AuthHeader';
import Sidebar from './components/Sidebar';

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full p-4 text-primary-foreground">
        <AuthHeader />
      </div>
      <div className="flex flex-grow md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex items-center justify-center flex-grow h-full bg-foreground">
          <main className="text-background">{children}</main>
        </div>
      </div>
    </div>
  );
}
