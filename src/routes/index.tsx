// Definição das rotas principais
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import { ROUTES } from '../config/routes';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import ServiceOpening from '../pages/services/ServiceOpening';
import ServiceMEI from '../pages/services/ServiceMEI';
import ServiceConsulting from '../pages/services/ServiceConsulting';
import ServiceIR from '../pages/services/ServiceIR';
import ServiceRegularization from '../pages/services/ServiceRegularization';
import ServiceSmallBusiness from '../pages/services/ServiceSmallBusiness';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import ClientArea from '../pages/ClientArea';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
  <BrowserRouter>
            <Routes>
          {/* Rotas com layout padrão */}
          <Route path={ROUTES.HOME} element={<DefaultLayout><Home /></DefaultLayout>} />
          <Route path={ROUTES.ABOUT} element={<DefaultLayout><About /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><Services /></DefaultLayout>} />
          
          {/* Rotas de serviços individuais */}
          <Route path={ROUTES.HOME} element={<DefaultLayout><ServiceOpening /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><ServiceMEI /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><ServiceConsulting /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><ServiceIR /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><ServiceRegularization /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><ServiceSmallBusiness /></DefaultLayout>} />
          
          <Route path={ROUTES.HOME} element={<DefaultLayout><Blog /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><Contact /></DefaultLayout>} />
          <Route path={ROUTES.HOME} element={<DefaultLayout><ClientArea /></DefaultLayout>} />
          
          {/* Rota 404 - Sem layout para ter design próprio */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  </BrowserRouter>
);

export default AppRoutes; 