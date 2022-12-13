import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';

import Header from './Components/Header/Header';
import { Main, Favorites, Manga, Chapter, Signup, Signin, Suggestion } from './Pages';

import SideMenu from './Features/SideMenu/SideMenu';
import SideMain from './Components/SideMain/SideMain';
import Titles from './Pages/Titles/Titles';
import UserPage from './Pages/User/UserPage';
import Library from './Pages/Library/Library';
import MDLists from './Pages/MDLists/MDLists';

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

          <Route path='/singin' element={<Signin />} />
          <Route path='/singup' element={<Signup />} />

          <Route path='/titles/*' element={<Titles />} />
          <Route path='/manga/:id' element={<Manga />} />
          <Route path='/user/:id' element={<UserPage />} />
          <Route path='/chapter/*' element={<Chapter />} />

          <Route path='/follows' element={<Library />} />
          <Route path='/lists' element={<MDLists />} />
          
          <Route path='*' element={<Main />} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
