import Branding from "@/components/branding";
import Container from "@/components/container";
import Content from "@/components/content";

import Stats from "@/components/stats";

export default function Home() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Stats />
        <Branding />
      </div>
      <div className="flex justify-center items-center">
        <Container>
          <Content />
        </Container>
      </div>
    </main>
  );
}
