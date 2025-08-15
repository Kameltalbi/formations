import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setOk(true);
  };

  if (ok) {
    return (
      <div className="mx-auto max-w-md py-10">
        <h1 className="text-2xl font-bold">Vérifiez votre email</h1>
        <p className="mt-2 text-gray-600">Un message a été envoyé à <b>{email}</b>.</p>
        <div className="mt-4"><Link to="/auth/connexion" className="text-emerald-700 underline">Aller à la connexion</Link></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-bold">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
               placeholder="email@domaine.tld" className="w-full rounded-xl border border-gray-300 px-3 py-2" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
               placeholder="Mot de passe (min. 6 caractères)" className="w-full rounded-xl border border-gray-300 px-3 py-2" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white">S'inscrire</button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Déjà inscrit ? <Link to="/auth/connexion" className="text-emerald-700 underline">Se connecter</Link>
      </div>
    </div>
  );
}
