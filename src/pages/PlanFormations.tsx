import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ————————————————————————————————————————
// Types côté front (miroir de la table Supabase)
// ————————————————————————————————————————
export type TrainingRow = {
  id: number;
  slug: string;
  domaine: "Carbone" | "Commercial" | "Digital" | string;
  titre: string;
  description: string;
  dates_label: string; // ex: "27–28 sept & 4–5 oct 2025"
  start_date: string;  // ISO date "2025-09-27"
  horaires: string;    // ex: "09:00–12:00 (UTC+1)"
  format: string;      // ex: "4 demi‑journées (en ligne)"
  public_cible: string;
  prix_dt: number | null;   // prix Tunisie en DT
  prix_usd: number | null;  // prix international en $
  lieu: string;       // ex: "En ligne – Zoom"
  checkout_url: string;
  objectifs: string[];       // texte court par item
  programme: { titre: string; points: string[] }[]; // 4 jours
  is_active: boolean;
  created_at: string;
};

// Couleurs par domaine
const DOMAINE_COLORS: Record<string, string> = {
  Carbone: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  Commercial: "bg-indigo-100 text-indigo-800 ring-indigo-200",
  Digital: "bg-amber-100 text-amber-800 ring-amber-200",
};

function Badge({ label }: { label: string }) {
  const cls = DOMAINE_COLORS[label] || "bg-gray-100 text-gray-800 ring-gray-200";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ${cls}`}>
      {label}
    </span>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

// ————————————————————————————————————————
// Page : Liste / tableau cliquable — données depuis Supabase
// ————————————————————————————————————————
export function TrainingsTable() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [domaine, setDomaine] = useState<string | "">("");
  const [rows, setRows] = useState<TrainingRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("plan_formations")
        .select("*")
        .eq("is_active", true)
        .order("start_date", { ascending: true });
      if (!active) return;
      if (error) {
        setError(error.message);
        setRows([]);
      } else {
        setRows((data as TrainingRow[]) || []);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const data = useMemo(() => {
    const list = rows || [];
    return list.filter((t) =>
      (!domaine || t.domaine === domaine) &&
      (!query || (t.titre + t.description + t.dates_label).toLowerCase().includes(query.toLowerCase()))
    );
  }, [rows, query, domaine]);

  return (
    <div className="py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Plan des formations</h1>
        <p className="mt-2 text-gray-600">
          Données dynamiques — tarifs chargés depuis Supabase (modifiable sans redéploiement).
        </p>
      </header>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un thème, une date…"
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-gray-300 focus:ring-4 focus:ring-gray-100"
          />
        </div>
        <div>
          <select
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-gray-300 focus:ring-4 focus:ring-gray-100"
          >
            <option value="">Tous les domaines</option>
            <option value="Carbone">Carbone</option>
            <option value="Commercial">Commercial</option>
            <option value="Digital">Digital</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="bg-gray-50 text-left text-sm">
              <th className="px-6 py-4 font-semibold text-gray-700">#</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Dates</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Thème</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Domaine</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Public</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Format</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr><td className="px-6 py-6 text-sm text-gray-500" colSpan={7}>Chargement…</td></tr>
            )}
            {error && !loading && (
              <tr><td className="px-6 py-6 text-sm text-red-600" colSpan={7}>{error}</td></tr>
            )}
            {!loading && !error && data.map((t, idx) => (
              <tr
                key={t.id}
                onClick={() => navigate(`/formations/${t.slug}`)}
                className="group cursor-pointer transition hover:bg-gray-50"
              >
                <td className="px-6 py-5 align-top text-gray-500">{idx + 1}</td>
                <td className="px-6 py-5 align-top">
                  <div className="font-medium">{t.dates_label}</div>
                  <div className="text-xs text-gray-500">{t.horaires}</div>
                </td>
                <td className="px-6 py-5 align-top">
                  <div className="font-semibold text-gray-900 group-hover:underline">{t.titre}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-gray-600">{t.description}</div>
                </td>
                <td className="px-6 py-5 align-top"><Badge label={t.domaine} /></td>
                <td className="px-6 py-5 align-top text-sm text-gray-700">{t.public_cible}</td>
                <td className="px-6 py-5 align-top text-sm text-gray-700">{t.format}</td>
                <td className="px-6 py-5 align-top">
                  <a
                    href={t.checkout_url}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    S'inscrire ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">Astuce : cliquez sur une ligne pour ouvrir la fiche détaillée.</p>
    </div>
  );
}

// ————————————————————————————————————————
// Page : Détail (charge une formation par slug)
// ————————————————————————————————————————
export function TrainingDetail() {
  const { slug } = useParams();
  const [row, setRow] = useState<TrainingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("plan_formations")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (!active) return;
      if (error) setError(error.message);
      setRow((data as TrainingRow) || null);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-600">Chargement…</div>
    );
  }

  if (error || !row) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">Formation introuvable</h2>
        <p className="mt-2 text-gray-600">Le lien n'est plus valide ou la formation n'existe pas.</p>
        <div className="mt-6">
          <Link to="/formations" className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-black">← Retour au plan</Link>
        </div>
      </div>
    );
  }

      const prix = row.prix_dt != null && row.prix_usd != null
      ? `${row.prix_dt} DT / ${row.prix_usd} $`
      : row.prix_dt != null
      ? `${row.prix_dt} DT`
      : row.prix_usd != null
      ? `${row.prix_usd} $`
      : "—";

  return (
    <div className="py-10">
      <Link to="/formations" className="inline-flex items-center text-sm text-gray-600 hover:underline">← Retour au plan</Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{row.titre}</h1>
              <Badge label={row.domaine} />
            </div>
            <p className="mt-3 text-gray-700">{row.description}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard label="Dates" value={row.dates_label} />
              <InfoCard label="Horaires" value={row.horaires} />
              <InfoCard label="Format" value={row.format} />
              <InfoCard label="Lieu" value={row.lieu} />
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Objectifs pédagogiques</h2>
              <ul className="mt-3 list-inside list-disc text-gray-700">
                {row.objectifs?.map((o, i) => (
                  <li key={i} className="leading-relaxed">{o}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Programme détaillé</h2>
              <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
                {row.programme?.map((j, i) => (
                  <div key={i} className="bg-white p-4">
                    <div className="font-medium text-gray-900">{j.titre}</div>
                    <ul className="mt-2 grid list-inside list-disc gap-1 pl-5 text-gray-700 sm:grid-cols-2">
                      {j.points.map((p, k) => (
                        <li key={k} className="leading-relaxed">{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Colonne latérale */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-600">Tarif</div>
              <div className="mt-1 text-2xl font-semibold">{prix}</div>
              <a
                href={row.checkout_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                S'inscrire maintenant ↗
              </a>
              <p className="mt-3 text-xs text-gray-500">
                Le paiement ouvre l'accès aux informations logistiques (Zoom), dossiers et supports.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-gray-900">Public cible</div>
              <p className="mt-1 text-gray-700">{row.public_cible}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-sm text-gray-900">{value}</div>
    </div>
  );
}

// ————————————————————————————————————————
// Composant principal pour la page des formations
// ————————————————————————————————————————
export default function PlanFormations() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <TrainingsTable />
        </Container>
      </main>
      <Footer />
    </>
  );
}
