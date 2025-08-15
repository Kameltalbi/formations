import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else {
      // Redirection conditionnelle selon le rôle
      if (email === "kameltalbi.tn@gmail.com") {
        navigate("/admin", { replace: true }); // Admin → Page admin
      } else {
        navigate("/espace", { replace: true }); // Utilisateur → Mes formations
      }
    }
  };

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-bold">Connexion</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
               placeholder="email@domaine.tld" className="w-full rounded-xl border border-gray-300 px-3 py-2" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
               placeholder="Mot de passe" className="w-full rounded-xl border border-gray-300 px-3 py-2" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading}
                className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white disabled:opacity-60">
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Pas encore de compte ? <Link to="/auth/inscription" className="text-emerald-700 underline">Créer un compte</Link>
      </div>
    </div>
  );
}
