
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap';

function App() {
  return (
    <div className="App">

      <NavBar />
      <ItemListContainer greeting={'Bienvenidos'} />

    </div>
  );
}

export default App;
