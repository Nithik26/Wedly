// In src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Index from './pages/index';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AiAssistant';
import WeddingDetails from './pages/WeddingDetails';
import Checklist from './pages/Checklist';
import Itinerary from './pages/Itinerary';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Components
import PrivateRoute from './components/PrivateRoute';

/* -------------------------------
   Handle redirect for logged-in users
   (prevents re-login after already logged in)
-------------------------------- */
function RedirectIfLoggedIn({ children }) {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* ✅ Login route: if already logged in → dashboard */}
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Auth />
            </RedirectIfLoggedIn>
          }
        />

        {/* --- Private Dashboard Routes --- */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="details" element={<WeddingDetails />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="itinerary" element={<Itinerary />} />
        </Route>

        {/* --- 404 Fallback --- */}
        <Route path="*" element={<h2 style={{ padding: "2rem" }}>404: Page Not Found</h2>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
