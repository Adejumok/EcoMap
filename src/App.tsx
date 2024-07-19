import './App.css'
import './index.css'
import 'leaflet/dist/leaflet.css';
import MapComponent from '../src/components/MapComponent';

const App: React.FC = () => {

  return (
    <div className='app-container '>
      <h1>Renewable Energy Source Locator</h1>
      <MapComponent/>
    </div>
  );
};

export default App;
