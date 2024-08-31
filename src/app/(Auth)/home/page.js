import { ChatLayout } from '../(components)/chatCN/chat-layout';

export default function Home() {
  const defaultLayout = undefined;

  return (
    // <h1 className="text-6xl font-bold text-center">Welcome to the Home Page</h1>
    <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
  );
}
