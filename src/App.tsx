import './App.css';
import { CharacterSheet } from './Components/CharacterSheet';
import { ClassBackground } from './Components/ClassBackground';
import { DiceRollContainer } from './Components/DiceRollContainer';

function App() {
  return (
    <div className="App">
      <ClassBackground/>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', padding: '124px', height: '100vh'}}>
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr'}}>
          <CharacterSheet/>
          <div style={{backgroundColor: 'transparent', height: '100%', width: '100%'}}>

          </div>  
        </div>
        <div/>
        <div style={{display: 'grid', gridTemplateRows: 'auto auto 40px 60px 40px 1fr', gap: '16px'}}>
          <DiceRollContainer/>
        </div>
      </div>
    </div>
  );
}

export default App;
