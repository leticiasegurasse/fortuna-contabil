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
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import ClientArea from '../pages/ClientArea';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import NotFound from '../pages/NotFound';
// Importações do painel administrativo
import AdminLogin from '../pages/admin/Login';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProtectedRoute from '../components/AdminProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import BlogManagement from '../pages/admin/BlogManagement';
import NewBlogPost from '../pages/admin/NewBlogPost';
import BlogCategories from '../pages/admin/BlogCategories';

const AppRoutes = () => (
  <BrowserRouter>
            <Routes>
          {/* Rotas com layout padrão */}
          <Route path={ROUTES.HOME} element={<DefaultLayout><Home /></DefaultLayout>} />
          <Route path={ROUTES.ABOUT} element={<DefaultLayout><About /></DefaultLayout>} />
          <Route path={ROUTES.SERVICES} element={<DefaultLayout><Services /></DefaultLayout>} />
          
          {/* Rotas de serviços individuais */}
          <Route path={ROUTES.SERVICE_OPENING} element={<DefaultLayout><ServiceOpening /></DefaultLayout>} />
          <Route path={ROUTES.SERVICE_MEI} element={<DefaultLayout><ServiceMEI /></DefaultLayout>} />
          <Route path={ROUTES.SERVICE_CONSULTING} element={<DefaultLayout><ServiceConsulting /></DefaultLayout>} />
          <Route path={ROUTES.SERVICE_IR} element={<DefaultLayout><ServiceIR /></DefaultLayout>} />
          <Route path={ROUTES.SERVICE_REGULARIZATION} element={<DefaultLayout><ServiceRegularization /></DefaultLayout>} />
          <Route path={ROUTES.SERVICE_SMALL_BUSINESS} element={<DefaultLayout><ServiceSmallBusiness /></DefaultLayout>} />
          
          <Route path={ROUTES.BLOG} element={<DefaultLayout><Blog /></DefaultLayout>} />
          <Route path={ROUTES.BLOG_POST} element={<DefaultLayout><BlogPost /></DefaultLayout>} />
          <Route path={ROUTES.CONTACT} element={<DefaultLayout><Contact /></DefaultLayout>} />
          <Route path={ROUTES.CLIENT_AREA} element={<DefaultLayout><ClientArea /></DefaultLayout>} />
          <Route path={ROUTES.PRIVACY_POLICY} element={<DefaultLayout><PrivacyPolicy /></DefaultLayout>} />
          
          {/* Rotas do painel administrativo - Sem layout padrão */}
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
          
          {/* Rotas do painel administrativo - Com layout AdminLayout */}
          <Route 
            path={ROUTES.ADMIN_DASHBOARD} 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          
          <Route 
            path={ROUTES.ADMIN_BLOG} 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <BlogManagement />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          
          <Route 
            path={ROUTES.ADMIN_BLOG_NEW} 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <NewBlogPost />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          
          <Route 
            path={ROUTES.ADMIN_BLOG_CATEGORIES} 
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <BlogCategories />
                </AdminLayout>
              </AdminProtectedRoute>
            } 
          />
          
          {/* Rota 404 - Sem layout para ter design próprio */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  </BrowserRouter>
);

export default AppRoutes; 