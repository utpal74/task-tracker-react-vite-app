
import './App.css';
import TaskProvider from './hooks/task-hook';
import HomePage from "./components/HomePage"

function App() {
  return (
    <TaskProvider>
      <HomePage /> 
    </TaskProvider>
  )
}

export default App;
