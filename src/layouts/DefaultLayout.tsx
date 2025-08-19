// Layout padrão para as páginas
import type { ReactNode } from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

type Props = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  // Força scroll para o topo quando a rota muda
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default DefaultLayout; 