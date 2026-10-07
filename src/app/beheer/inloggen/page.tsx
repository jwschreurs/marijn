import { redirect } from 'next/navigation';
import { isAdmin, isAdminConfigured } from '@/lib/admin-auth';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function LoginPage() {
  if (!isAdminConfigured()) redirect('/beheer');
  if (await isAdmin()) redirect('/beheer');
  return <main className="section">
    <div className="container narrow admin-login content-card">
      <p className="eyebrow">Marijn met aandacht</p>
      <h1>Inloggen voor beheer</h1>
      <p>Log in met je beheerderswachtwoord om de website bij te werken.</p>
      <LoginForm />
    </div>
  </main>;
}
