import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';

import Header from './Components/Header/Header';
import { Main, Favorites, Manga, Chapter, Singup, Singin, Suggestion } from './Pages';

import SideMenu from './Features/SideMenu/SideMenu';
import SideMain from './Components/SideMain/SideMain';
import Titles from './Pages/Titles/Titles';
import UserPage from './Pages/User/UserPage';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Header />
      <div className="content__wrap">
        <SideMenu options={{menuType: 'main'}}>
          <SideMain />
        </SideMenu>
        <Routes>
          <Route path='/' element={<Suggestion />} />
          <Route path='/favorites' element={<Favorites />} />

          <Route path='/singin' element={<Singin />} />
          <Route path='/singup' element={<Singup />} />

          <Route path='/titles/*' element={<Titles />} />
          <Route path='/manga/:id' element={<Manga />} />
          <Route path='/user/:id' element={<UserPage />} />
          <Route path='/chapter/*' element={<Chapter />} />
          
          <Route path='*' element={<Main />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
