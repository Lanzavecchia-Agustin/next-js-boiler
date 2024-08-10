import AuthLayout from './(noAuth)/layout';
import LoginPage from './(noAuth)/login/page';

export default function Home() {
  return (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  );
}
