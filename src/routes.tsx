import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LatestNews from './pages/LatestNews';
import Shorts from './pages/Shorts';
import NewsDetail from './pages/NewsDetail';
import AdminPanel from './pages/admin/AdminPanel';
import UserProfile from './pages/profile/UserProfile';
import Login from './pages/auth/Login';
import LiveTV from './pages/LiveTV';
import ContactUs from './pages/ContactUs';
import AppTour from './pages/AppTour';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Grievance from './pages/Grievance';
import HelpCenter from './pages/HelpCenter';
import FAQs from './pages/FAQs';
import Advertise from './pages/Advertise';
import BecomeJournalist from './pages/BecomeJournalist';
import AuthGuard from './components/auth/AuthGuard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/latest" element={<LatestNews />} />
      <Route path="/shorts" element={<Shorts />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/live" element={<LiveTV />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/app-tour" element={<AppTour />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/grievance" element={<Grievance />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/advertise" element={<Advertise />} />
      <Route path="/become-journalist" element={<BecomeJournalist />} />
      <Route 
        path="/admin/*" 
        element={
          <AuthGuard requiredRole="admin">
            <AdminPanel />
          </AuthGuard>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <AuthGuard>
            <UserProfile />
          </AuthGuard>
        } 
      />
    </Routes>
  );
}