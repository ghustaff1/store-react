import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import './scss/app.scss';


function App() {
  return (
    <div className="App">
      <Header/>
      <Categories/>
      <Home/>
    </div>
  );
}

export default App;
