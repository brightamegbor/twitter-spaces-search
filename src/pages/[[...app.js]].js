// import logo from './logo.svg';
// import './App.css';
import SideDrawer from '../components/sidedrawer';
import Spaces from '../components/spaces';

function App() {
    return (
        <div className="App">
            <SideDrawer>
                <Spaces />
            </SideDrawer>
        </div>
    );
}

export default App;
