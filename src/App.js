import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Authentication from './views/auth/Authentication';
import Main from './views/main/Main';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Authentication />} path='/' />
          <Route element={<Main />} path='/main' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
