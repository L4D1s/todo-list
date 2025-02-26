import {Header} from "./components/header/header";
import Footer from "./components/footer/footer";
import './index.css';

function App() {
  return (
      <div id="root" className="App">
          <Header />
          <main className="content">
              <p style={{textAlign: 'center', marginTop: '30px'}}>Тут что-нибудь будет позже</p>
          </main>
          <Footer />
      </div>
  );
}

export default App;
