import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BottomNav from './components/navigation/BottomNav';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 container mx-auto px-4 pb-16">
                <AppRoutes />
              </main>
              <Footer />
              <BottomNav />
            </div>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;