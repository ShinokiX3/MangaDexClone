import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';

import Header from './Header/Header';
import { Main, Favorites, Manga, Chapter, Singup, Singin, Suggestion } from '../Pages';

import SideMenu from './SideMenu/SideMenu';
import SideMain from './SideMenus/SideMain/SideMain';
import Titles from './../Pages/Titles/Titles';

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
          <Route path='/manga/*' element={<Manga />} />
          <Route path='/chapter/*' element={<Chapter />} />
          <Route path='*' element={<Main />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
