import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center pt-28">
      <Container className="text-center">
        <p className="eyebrow text-gold">Page introuvable</p>
        <h1 className="mt-5 font-serif text-4xl text-ivory sm:text-5xl">
          Cette page s'est perdue en chemin
        </h1>
        <p className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-mist">
          Le lien que vous avez suivi ne mène nulle part — mais l'essentiel est
          toujours là, quelques pas plus loin.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonVariants({ variant: "gold", size: "lg" })}>
            Revenir à l'accueil
          </Link>
          <Link href="/#messages" className={buttonVariants({ variant: "glass", size: "lg" })}>
            Voir le livre d'or
          </Link>
        </div>
      </Container>
    </div>
  );
}
