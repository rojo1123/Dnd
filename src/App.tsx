import './App.css';
import { CharacterSheet } from './Components/CharacterSheet';
import { ClassBackground } from './Components/ClassBackground';
import { DiceRollContainer } from './Components/DiceRollContainer';

function App() {
  return (
    <div className="App">
      <ClassBackground/>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '124px'}}>
        <CharacterSheet/>
        <div/>
        <div style={{display: 'grid', gridTemplateRows: '1fr auto 1fr', gap: '16px'}}>
          <DiceRollContainer/>
        </div>
      </div>
    </div>
  );
}

export default App;
