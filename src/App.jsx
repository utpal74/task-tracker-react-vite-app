
import './App.css';
import TaskProvider from './hooks/task-hook';
import HomePage from "./components/HomePage"

function App({ auth }) {
  const { isSignedIn } = auth();

  return (
    <TaskProvider isSignedIn={isSignedIn}>
      <HomePage />
    </TaskProvider>
  )
}

export default App;
