import './App.css';
import { Route, Routes } from "react-router-dom"
import { HomePage } from './pages/homepage/HomePage';
import { EventFull } from './components/EventFull/EventFull';
import { Header } from './components/Header/Header';
import { Organizator } from './pages/organizator/Organizator';
import { ProfileOrganizator } from './pages/profileO/ProfileOrganizator';

function App() {
  return (
    <div className='app'>
        <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/events/:id' element={<EventFull/>}/>
      <Route path='/organizator' element={<Organizator/>}/>
      <Route path='/organizator/:id' element={<ProfileOrganizator/>}/>
    </Routes>
    </div>
  );
}

export default App;
