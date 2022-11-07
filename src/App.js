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
          <Route path='MangaDexClone/' element={<Suggestion />} />
          <Route path='MangaDexClone/favorites' element={<Favorites />} />

          <Route path='MangaDexClone/singin' element={<Singin />} />
          <Route path='MangaDexClone/singup' element={<Singup />} />

          <Route path='MangaDexClone/titles/*' element={<Titles />} />
          <Route path='MangaDexClone/manga/:id' element={<Manga />} />
          <Route path='MangaDexClone/user/:id' element={<UserPage />} />
          <Route path='MangaDexClone/chapter/*' element={<Chapter />} />
          
          <Route path='*' element={<Main />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
