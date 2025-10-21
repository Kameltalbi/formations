import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase";
import RequireAuth from "../RequireAuth";

type Training = {
  id: number;
  slug: string;
  titre: string;
  description: string;
  dates_label: string;
  start_date: string;
};

export default function MesFormations() {
  const [rows, setRows] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.rpc("my_trainings");
      if (!mounted) return;
      if (error) setError(error.message);
      setRows((data as Training[]) || []);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-5xl py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes formations</h1>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate("/", { replace: true }); }}
            className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Se déconnecter
          </button>
        </div>

        {loading && <p className="mt-6 text-gray-600">Chargement…</p>}
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {!loading && rows.length === 0 && !error && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-gray-700">
            Vous n’avez pas encore de formation.{" "}
            <Link to="/formations" className="text-emerald-700 underline">Voir le catalogue</Link>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {rows.map((t) => (
            <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-gray-500">{t.dates_label}</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">{t.titre}</div>
              <p className="mt-2 line-clamp-3 text-sm text-gray-700">{t.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => navigate(`/espace/formation/${t.slug}`)}
                  className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Voir les contenus
                </button>
                <Link to={`/formations/${t.slug}`} className="text-sm text-gray-600 underline">
                  Page publique
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}
