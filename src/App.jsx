
import './App.css';
import TaskProvider from './hooks/task-hook';
import HomePage from "./components/HomePage";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskDashBoard from './components/TaskDashboard';
import { Routes, Route } from 'react-router-dom';

function App({ auth }) {
  const { isSignedIn } = auth();

  return (
    <TaskProvider isSignedIn={isSignedIn}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/taskdashboard" element={<TaskDashBoard />} />
      </Routes>
    </TaskProvider>
  )
}

export default App;
