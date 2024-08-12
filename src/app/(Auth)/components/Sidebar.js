import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden bg-background lg:block">
        <div className="flex flex-col items-center gap-6 px-4 py-6">
          <Link
            href="/home"
            className="flex items-center justify-center w-10 h-10 text-xl font-semibold rounded-full bg-primary text-primary-foreground"
            prefetch={false}
          >
            A
          </Link>
          <nav className="flex flex-col items-start gap-2">
            <Link
              href="/home"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <HomeIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <SettingsIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>
        </div>
      </div>
      <div>
        <header className="sticky top-0 z-10 flex items-start justify-between px-4 h-14 bg-background sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col items-start gap-6 px-4 py-6 sm:max-w-xs"
            >
              <div className="flex flex-col items-center gap-6 px-4 py-6">
                <Link
                  href="/home"
                  className="flex items-center justify-center w-10 h-10 text-xl font-semibold rounded-full bg-primary text-primary-foreground"
                  prefetch={false}
                >
                  A
                </Link>
                <nav className="flex flex-col items-start gap-2">
                  <Link
                    href="/home"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    prefetch={false}
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    prefetch={false}
                  >
                    <SettingsIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
