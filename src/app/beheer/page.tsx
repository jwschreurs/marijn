import { redirect } from 'next/navigation';
import { isAdmin, isAdminConfigured } from '@/lib/admin-auth';
import { readContentSnapshot } from '@/lib/content';
import { getContentFields } from '@/lib/content-schema';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { logout } from './actions';

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return <main className="section"><div className="container narrow content-card">
      <p className="eyebrow">Website beheren</p>
      <h1>Het beheer wordt nog ingericht</h1>
      <p>De opslag en het beheerderswachtwoord moeten eerst worden gekoppeld. Daarna kun je hier inloggen en teksten aanpassen.</p>
    </div></main>;
  }
  if (!(await isAdmin())) redirect('/beheer/inloggen');
  const snapshot = await readContentSnapshot();
  return <main className="section admin-page">
    <div className="container">
      <div className="admin-heading">
        <div><p className="eyebrow">Marijn met aandacht</p><h1>Website beheren</h1>
          <p>Kies een pagina, pas de tekst aan en publiceer je wijzigingen.</p></div>
        <div className="admin-actions">
          <a href="/" target="_blank" rel="noreferrer" className="button secondary">Bekijk website</a>
          <form action={logout} data-admin-logout><button className="button secondary" type="submit">Uitloggen</button></form>
        </div>
      </div>
      <ContentEditor fields={getContentFields(snapshot.overrides)} revision={snapshot.revision} updatedAt={snapshot.updatedAt} />
    </div>
  </main>;
}
