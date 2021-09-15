import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import { Header } from './layout/Header';
import { CategoryScreen } from './screen/CategoryScreen';
import { PostCreateScreen } from './screen/PostCreateScreen';
import { PostEditScreen } from './screen/PostEditScreen';
import { PostScreen } from './screen/PostScreen';

function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
        <Header></Header>
      </header>

      <main>
        
          <Switch>
            <Route exact path="/"> 
              Inicio
            </Route>

            <Route exact path="/categories/:id">
              <CategoryScreen/>
            </Route>

            <Route exact path="/categories/:id/create">
              <PostCreateScreen ></PostCreateScreen>
            </Route>

            <Route exact path="/categories/:idc/post/:idp">
              <PostScreen ></PostScreen>
            </Route>

            <Route exact path="/categories/:idc/post/:idp/edit">
              <PostEditScreen></PostEditScreen>
            </Route>

          </Switch>
      
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
