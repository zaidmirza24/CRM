import './App.css';
import { PageTitleProvider } from './components/PageTitleContext';
import { TaskProvider } from './pages/TaskContext';
import AppRouter from './routes/AppRouter';  // Import AppRouter

const App = () => {
  return (
    <PageTitleProvider>
      <TaskProvider>
      <AppRouter />  {/* Use AppRouter here, no need to wrap it in Layout */}
      </TaskProvider>
    </PageTitleProvider>
  );
};

export default App;
