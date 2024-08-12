import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SettingsForm() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage alt="A" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change</Button>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <Label className="mb-6 text-xl">Change Password</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Your password must be at least 8 characters long and contain at
            least one uppercase letter, one lowercase letter, and one number.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="destructive">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
