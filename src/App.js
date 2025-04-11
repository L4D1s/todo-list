import {Header} from "./components/header/header";
import Footer from "./components/footer/footer";
import TaskList from "./components/tasks/TaskList";
import './index.css';
import { TaskProvider } from './context/TaskContext';


function App() {
  return (
      <TaskProvider>
          <div id="root" className="App">
              <Header />
              <main className="content">
                  <TaskList/>
              </main>
              <Footer />
          </div>
      </TaskProvider>
  );
}

export default App;
