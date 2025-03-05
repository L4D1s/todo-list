import {Header} from "./components/header/header";
import Footer from "./components/footer/footer";
import TaskList from "./components/tasks/TaskList";
import './index.css';
import { tasksData } from "./components/tasks/tasksData";


function App() {
  return (
      <div id="root" className="App">
          <Header />
          <main className="content">
              <TaskList tasks={tasksData} />
          </main>
          <Footer />
      </div>
  );
}

export default App;
