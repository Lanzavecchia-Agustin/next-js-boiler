'use client';
import AuthHeader from './(components)/AuthHeader';
import { ChatProvider } from './(contexts)/ChatContext';

export default function AuthLayout({ children }) {
  return (
    <ChatProvider>
      <div className="relative flex flex-col h-screen">
        <div className="w-full p-4 text-primary-foreground">
          <AuthHeader />
        </div>
        <div className="flex flex-grow md:flex-row">
          <div className="relative flex items-center justify-center flex-grow h-full">
            <main className="w-full ">{children}</main>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
