import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";

// Doit matcher la structure de la table
type Row = {
  id: number;
  slug: string;
  titre: string;
  domaine: string;
  dates_label: string;
  start_date: string;
  prix_dt: number | null;
  prix_usd: number | null;
  checkout_url: string;
  is_active: boolean;
};

const ADMIN_EMAIL = "kameltalbi.tn@gmail.com"; // Email admin configuré

export default function AdminFormations() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Vérifier la session + email admin
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email ?? null;
      setUserEmail(email);
      
      // Vérifier si l'utilisateur est admin
      const adminStatus = !!email && (!!ADMIN_EMAIL ? email === ADMIN_EMAIL : false);
      setIsAdmin(adminStatus);
      
      // Rediriger si non-admin
      if (email && !adminStatus) {
        alert("Accès non autorisé. Redirection vers la page d'accueil.");
        navigate("/");
        return;
      }
    })();
  }, [navigate]);

  // Charger les formations (seulement si admin)
  useEffect(() => {
    if (!isAdmin) return; // Ne pas charger si non-admin
    
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("plan_formations")
        .select("id, slug, titre, domaine, dates_label, start_date, prix_dt, prix_usd, checkout_url, is_active")
        .order("start_date", { ascending: true });
      if (error) setError(error.message);
      setRows((data as Row[]) || []);
      setLoading(false);
    })();
  }, [isAdmin]);

  const handleSignIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Vérifie ta boîte mail pour te connecter.");
  };

  const updateField = (id: number, field: keyof Row, value: any) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const saveRow = async (id: number) => {
    const row = rows.find(r => r.id === id);
    if (!row) return;
    setSavingId(id);
    const { error } = await supabase
      .from("plan_formations")
      .update({
        prix_dt: row.prix_dt,
        prix_usd: row.prix_usd,
        checkout_url: row.checkout_url,
        is_active: row.is_active,
      })
      .eq("id", id);
    setSavingId(null);
    if (error) alert(error.message);
    else alert("Enregistré.");
  };

  // Affichage de chargement initial
  if (isAdmin === null) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-bold">Admin Formations</h1>
        <p className="mt-2 text-gray-600">Vérification des droits d'accès...</p>
      </div>
    );
  }

  // Affichage si non-admin
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-bold">Admin Formations</h1>
        <p className="mt-2 text-gray-600">Connecte-toi avec l'email admin pour gérer les tarifs et l'activation.</p>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
            handleSignIn(email);
          }}
        >
          <input name="email" type="email" required placeholder="email@domaine.tld"
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2" />
          <button className="rounded-xl bg-gray-900 px-4 py-2 text-white">Recevoir le lien</button>
        </form>

        {!!userEmail && !isAdmin && (
          <p className="mt-3 text-sm text-red-600">
            Connecté en tant que <b>{userEmail}</b>, mais non autorisé. Utilise l'email admin défini dans <code>VITE_ADMIN_EMAIL</code>.
          </p>
        )}
        
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Formations</h1>
        <Link className="text-sm text-blue-600 hover:underline" to="/">← Retour au site</Link>
      </div>

      {loading ? (
        <p className="mt-6 text-gray-600">Chargement…</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">DT</th>
                                    <th className="px-4 py-3">USD</th>
                <th className="px-4 py-3">Checkout</th>
                <th className="px-4 py-3">Actif</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map(r => (
                <tr key={r.id} className="align-top">
                  <td className="px-4 py-3">{r.dates_label}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.titre}</div>
                    <div className="text-xs text-gray-500">{r.slug} — {r.domaine}</div>
                  </td>
                  <td className="px-4 py-3">
                    <input type="number" step="0.01" value={r.prix_dt ?? ""} placeholder="—"
                      onChange={(e) => updateField(r.id, "prix_dt", e.target.value === "" ? null : Number(e.target.value))}
                      className="w-24 rounded border px-2 py-1" />
                  </td>
                  <td className="px-4 py-3">
                    <input type="number" step="0.01" value={r.prix_usd ?? ""} placeholder="—"
                      onChange={(e) => updateField(r.id, "prix_usd", e.target.value === "" ? null : Number(e.target.value))}
                      className="w-24 rounded border px-2 py-1" />
                  </td>
                  <td className="px-4 py-3">
                    <input type="url" value={r.checkout_url}
                      onChange={(e) => updateField(r.id, "checkout_url", e.target.value)}
                      className="w-64 rounded border px-2 py-1" />
                  </td>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={r.is_active}
                      onChange={(e) => updateField(r.id, "is_active", e.target.checked)} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={savingId === r.id}
                      onClick={() => saveRow(r.id)}
                      className="rounded bg-emerald-600 px-3 py-1.5 text-white disabled:opacity-60"
                    >
                      {savingId === r.id ? "Enregistrement…" : "Enregistrer"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
