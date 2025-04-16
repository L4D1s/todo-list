import {Header} from "./components/header/header";
import Footer from "./components/footer/footer";
import { Outlet } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
