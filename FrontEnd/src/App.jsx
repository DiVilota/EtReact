import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext'; // ← AGREGAR
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider> {/* ← AGREGAR */}
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/juego/:id" element={<GameDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/contacto" element={<Contact />} />

                </Routes>
              </main>
              
              <Footer />
            </div>
          </CartProvider>
        </UserProvider> {/* ← AGREGAR */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;