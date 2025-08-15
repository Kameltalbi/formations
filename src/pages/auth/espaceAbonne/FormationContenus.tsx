import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../../supabase";
import RequireAuth from "../RequireAuth";

type Training = {
  id: number;
  slug: string;
  titre: string;
  description: string;
  dates_label: string;
  horaires: string;
  lieu: string;
  checkout_url: string;
};

type Material = {
  id: number;
  training_id: number;
  title: string;
  kind: "video" | "pdf" | "slide" | "link";
  storage_path: string | null;
  external_url: string | null;
  is_public: boolean;
  sort_order: number;
};

export default function FormationContenus() {
  const { slug } = useParams();
  const [training, setTraining] = useState<Training | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);

      // 1) Récupérer la formation (vue publique)
      const { data: train, error: trainErr } = await supabase
        .from("plan_formations_public")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!mounted) return;
      if (trainErr || !train) {
        setError(trainErr?.message || "Formation introuvable");
        setLoading(false);
        return;
      }
      setTraining(train as Training);

      // 2) Vérifier inscription de l'utilisateur
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user?.id;
      if (uid) {
        const { data: enr } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", uid)
          .eq("training_id", (train as any).id)
          .eq("status", "paid");
        setEnrolled((enr || []).length > 0);
      } else {
        setEnrolled(false);
      }

      // 3) Charger les contenus (RLS applique l'accès)
      const { data: mats, error: matsErr } = await supabase
        .from("training_materials")
        .select("*")
        .eq("training_id", (train as any).id)
        .order("sort_order", { ascending: true });

      if (matsErr) setError(matsErr.message);
      setMaterials((mats as Material[]) || []);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <RequireAuth>
        <div className="py-16 text-center text-gray-600">Chargement…</div>
      </RequireAuth>
    );
  }

  if (error || !training) {
    return (
      <RequireAuth>
        <div className="mx-auto max-w-4xl py-10">
          <h1 className="text-2xl font-bold">Erreur</h1>
          <p className="mt-2 text-gray-700">{error ?? "Une erreur est survenue."}</p>
          <div className="mt-4">
            <Link to="/espace" className="text-emerald-700 underline">← Retour à mes formations</Link>
          </div>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="mx-auto max-w-5xl py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{training.titre}</h1>
            <div className="mt-1 text-sm text-gray-600">
              {training.dates_label} • {training.horaires} • {training.lieu}
            </div>
          </div>
          <Link to="/espace" className="text-sm text-gray-600 underline">← Mes formations</Link>
        </div>

        {!enrolled && (
          <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
            Vous n'êtes pas inscrit à cette formation avec ce compte.
            {training.checkout_url && (
              <> {" "}
                <a href={training.checkout_url} target="_blank" rel="noreferrer" className="font-medium underline">
                  S'inscrire maintenant
                </a>
              </>
            )}
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {materials.map((m) => (
            <MaterialCard key={m.id} material={m} />
          ))}
        </div>

        {materials.length === 0 && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 text-gray-700">
            Aucun contenu n'est disponible pour le moment.
          </div>
        )}
      </div>
    </RequireAuth>
  );
}

function MaterialCard({ material }: { material: Material }) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (material.storage_path) {
        const { data, error } = await supabase
          .storage
          .from("training-materials") // bucket privé
          .createSignedUrl(material.storage_path, 60 * 60); // 1h
        if (!error) setSignedUrl(data?.signedUrl ?? null);
      }
    })();
  }, [material.storage_path]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-gray-900">{material.title}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">{material.kind}</div>
      <div className="mt-3">
        {material.kind === "video" ? (
          <VideoPlayer externalUrl={material.external_url} signedUrl={signedUrl} />
        ) : material.kind === "pdf" || material.kind === "slide" ? (
          <a
            href={material.external_url ?? signedUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Ouvrir / Télécharger
          </a>
        ) : material.kind === "link" ? (
          <a
            href={material.external_url ?? undefined}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 underline"
          >
            Ouvrir le lien
          </a>
        ) : (
          <div className="text-gray-600">Type de contenu non pris en charge.</div>
        )}
      </div>
    </div>
  );
}

function VideoPlayer({ externalUrl, signedUrl }: { externalUrl: string | null; signedUrl: string | null }) {
  const provider = useMemo(() => {
    if (!externalUrl) return signedUrl ? "file" : null;
    const url = externalUrl.toLowerCase();
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("vimeo.com")) return "vimeo";
    if (url.includes("mux.com")) return "mux";
    return "link";
  }, [externalUrl, signedUrl]);

  if (provider === "youtube" && externalUrl) {
    const idMatch = externalUrl.match(/(?:v=|youtu\.be\/)([\w-]{8,})/i);
    const id = idMatch?.[1];
    const src = id ? `https://www.youtube.com/embed/${id}` : externalUrl;
    return (
      <div className="aspect-video overflow-hidden rounded-xl border">
        <iframe src={src} title="YouTube" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full" />
      </div>
    );
  }

  if (provider === "vimeo" && externalUrl) {
    const idMatch = externalUrl.match(/(?:vimeo\.com\/)(\d+)/i);
    const id = idMatch?.[1];
    const src = id ? `https://player.vimeo.com/video/${id}` : externalUrl;
    return (
      <div className="aspect-video overflow-hidden rounded-xl border">
        <iframe src={src} title="Vimeo" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" />
      </div>
    );
  }

  if (provider === "mux" && externalUrl) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border">
        <video src={externalUrl} controls className="h-full w-full" />
      </div>
    );
  }

  if (provider === "file" && signedUrl) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border">
        <video src={signedUrl} controls className="h-full w-full" />
      </div>
    );
  }

  if (provider === "link" && externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Regarder la vidéo
      </a>
    );
  }

  return (
    <div className="text-gray-500 text-sm">
      Aucune vidéo disponible
    </div>
  );
}
