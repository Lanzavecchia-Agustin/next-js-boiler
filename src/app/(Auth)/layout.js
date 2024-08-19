'use client';
import AuthHeader from './(components)/AuthHeader';
import ChatStructure from './(components)/chat/ChatStructure';
import { ChatProvider } from './(contexts)/ChatContext';

export default function AuthLayout({ children }) {
  return (
    <ChatProvider>
      <div className="relative flex flex-col h-screen">
        <div className="w-full p-4 text-primary-foreground">
          <AuthHeader />
        </div>
        <div className="flex flex-grow md:flex-row">
          {/* Main Content Area */}
          <div className="relative flex items-center justify-center flex-grow h-full bg-foreground">
            <main className="w-full text-background">{children}</main>
          </div>
        </div>
        <ChatStructure />
      </div>
    </ChatProvider>
  );
}
