import Hero from "@/components/Hero";
import Perfil from "@/components/Perfil";
import Logros from "@/components/Logros";
import Proyectos from "@/components/Proyectos";
import Actividad from "@/components/Actividad";
import Stack from "@/components/Stack";
import Contacto from "@/components/Contacto";
import Dock from "@/components/Dock";
import ProgresoScroll from "@/components/ProgresoScroll";

export default function Pagina() {
  return (
    <>
      <ProgresoScroll />
      <Hero />
      <main>
        <Perfil />
        <Logros />
        <Proyectos />
        <Actividad />
        <Stack />
        <Contacto />
      </main>
      <Dock />
    </>
  );
}
