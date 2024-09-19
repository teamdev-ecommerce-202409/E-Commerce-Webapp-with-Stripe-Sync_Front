import { Footer } from "./Footer";
import { Header } from "./Header";
import "../../style/Layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <div className="childrenContainer">{children}</div>
      <Footer />
    </main>
  );
}
