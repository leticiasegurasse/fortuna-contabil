import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogOut, 
  FileText, 
  ChevronDown,
  Home,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { ROUTES } from '../config/routes';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavigationItem {
  name: string;
  icon: React.ComponentType<any>;
  current: boolean;
  href?: string;
  children?: {
    name: string;
    href: string;
    current: boolean;
  }[];
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const navigation: NavigationItem[] = [
    /*{
      name: 'Dashboard',
      href: ROUTES.ADMIN_DASHBOARD,
      icon: LayoutDashboard,
      current: location.pathname === ROUTES.ADMIN_DASHBOARD
    },*/
    {
      name: 'Blog',
      icon: FileText,
      current: location.pathname.startsWith('/admin/blog'),
      children: [
        { name: 'Todos os Posts', href: ROUTES.ADMIN_BLOG, current: location.pathname === ROUTES.ADMIN_BLOG },
        { name: 'Novo Post', href: ROUTES.ADMIN_BLOG_NEW, current: location.pathname === ROUTES.ADMIN_BLOG_NEW },
        { name: 'Categorias', href: ROUTES.ADMIN_BLOG_CATEGORIES, current: location.pathname === ROUTES.ADMIN_BLOG_CATEGORIES },
        { name: 'Tags', href: ROUTES.ADMIN_BLOG_TAGS, current: location.pathname === ROUTES.ADMIN_BLOG_TAGS }
      ]
    },
    {
      name: 'Newsletter',
      icon: Mail,
      current: location.pathname === ROUTES.ADMIN_NEWSLETTER,
      href: ROUTES.ADMIN_NEWSLETTER
    },
    /*{
      name: 'Clientes',
      href: '/admin/configuracoes',
      icon: Users,
      current: location.pathname.startsWith('/admin/clientes')
    },*/
    /*{
      name: 'Configurações',
      href: '/admin/configuracoes',
      icon: Settings,
      current: location.pathname.startsWith('/admin/configuracoes')
    }*/
  ];

  return (
    <div className="min-h-screen bg-background-500">
      {/* Sidebar para desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-neutral-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center space-x-2">
              <img 
                src="/logo-preta.png" 
                alt="Fortuna Contábil" 
                className="h-8"
              />
              <span className="text-lg font-semibold text-secondary-500">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {item.children ? (
                        // Item com submenu
                        <div>
                          <button
                            onClick={() => setBlogMenuOpen(!blogMenuOpen)}
                            className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              item.current
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="h-5 w-5" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${
                                blogMenuOpen ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {blogMenuOpen && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-8 mt-1 space-y-1"
                              >
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <Link
                                      to={child.href}
                                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                        child.current
                                          ? 'bg-primary-50 text-primary-600'
                                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                      }`}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                                             ) : (
                         // Item simples
                         <Link
                           to={item.href || '#'}
                           className={`group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                             item.current
                               ? 'bg-primary-50 text-primary-600'
                               : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                           }`}
                         >
                           <item.icon className="h-5 w-5" />
                           <span>{item.name}</span>
                         </Link>
                       )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* User section */}
              <li className="mt-auto">
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {user?.username}
                      </p>
                      <p className="text-xs text-neutral-500">Administrador</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-neutral-900/80" onClick={() => setSidebarOpen(false)} />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center space-x-2">
                  <img 
                    src="/logo-preta.png" 
                    alt="Fortuna Contábil" 
                    className="h-8"
                  />
                  <span className="text-lg font-semibold text-secondary-500">
                    Admin
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile navigation - similar to desktop but simplified */}
              <nav className="px-6 py-4">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href || '#'}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          item.current
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-neutral-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            
            {/* User menu for mobile */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden sm:block sm:h-6 sm:w-px sm:bg-neutral-200" />
              
              <div className="flex items-center space-x-4">
                <Link
                  to={ROUTES.HOME}
                  className="flex items-center space-x-2 text-sm text-neutral-500 hover:text-neutral-700"
                >
                  <Home className="h-4 w-4" />
                  <span>Ver Site</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
