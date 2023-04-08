import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSelector } from 'react-redux';
import { NavBar } from './components/Bars/NavBar/NavBar';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
function App() {
  const loggedIn = useSelector((state) => state.auth)

  return (
    <div className="App background" >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
