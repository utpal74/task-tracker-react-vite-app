
import './App.css';
import TaskDashBoard from './components/TaskDashboard';
import TaskProvider from './hooks/task-hook';
import HomePage from "./components/HomePage"

function App() {
  return (
    <TaskProvider>
      
      <TaskDashBoard />
      {/* <HomePage />  */}
    </TaskProvider>
  )
}

export default App;
