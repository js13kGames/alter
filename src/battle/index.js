import { add } from 'pura/vector/tuple';
import { camera, } from 'camera';
import { uiElements } from 'ui';
import Menu from 'menu';
import StatusBar from 'battle/statusBar';
import BattleMap from 'battle/map';
import { initializeMap, turnOrder, moveCharacter } from 'battle/grid';
import Move from 'battle/actions/Move';
import state from 'state';

/*
type CharacterData = [
  string, // Name to be used to look up data
  [number, number, number] // Hex position of said character
];

interface createBattle {
  (characters: CharacterData) => battle scene
}
*/

const cameraOffset = [0, -150];

function* generateGetCharacter(turnOrder) {
  let i = 0;
  while(true) {
    const char = turnOrder[i % (turnOrder.length)];
    ++i;
    const [, health] = char;
    if(health > 0) {
      yield char;
    }
  }
}

export default function createBattleScene(characters, mapSize) {
  initializeMap(characters, mapSize);

  let turn = null;
  let selectedAction = null;
  const action = {
    // Player Controlled Character Movement
    move: (character) => [`Move`, () => selectedAction = Move(character)],
    // Player Controlled Attack
    // attack: (character, { name, range, damage }) => ([name, () => selectedAction = function* () {
    //   const [, , position] = character;
    //   // 1) Detect & Display possible attackers
    //   clear(optionHexes);
    //   const nearbyTargets = getNearbyEnemies(position, range);
    //   optionHexes.push(...nearbyTargets);
    //   // 1b) If none display warning text ( there are no nearby enemies) and prompt a reselection
    //   if(!nearbyTargets.length) {
    //     // TODO: SOMETHING HERE
    //   }
    //   // 2) Wait for player to select target.
    //   let selectedTarget = null;
    //   while(!selectedTarget) {
    //     cameraControls();
    //     const { click, mousePosition } = inputs;
    //     if(click === 1) {
    //       state.target = getGridHexFromVector2d(
    //         scaleSet(calcWorldPosition(mousePosition), 1 / gridScale)
    //       );
    //       if(contains(optionHexes, state.target)) selectedTarget = getCharacterAtHex(state.target);
    //     }
    //     yield;
    //   }
    //   clear(optionHexes);
    //   // 3) Inflict damage on target
    //   selectedTarget[1] += damage;
    //   // 4) Play animation
    //   // const attackAnimation = animation(character, selectedTarget);
    //   // while(!attackAnimation()) yield;
    // }()]),
    // defense: (character, { name, range, percentage, duration }) => ([name, () => selectedAction = function* () {
    //   // 1) Detect & display all eligible characters
    //   const [, , position] = character;
    //   // 1) Detect & Display possible attackers
    //   clear(optionHexes);
    //   const nearbyTargets = getNearbyAllies(position, range);
    //   optionHexes.push(...nearbyTargets);
    //   // 2) Wait for confirmation
    //   let confirmed = false;
    //   const confirmMenuIndex = uiElements.push(Menu([
    //     [`Confirm`, () => confirmed = true],
    //     [`Cancel`, () => { }],
    //   ]));
    //   while(confirmed) {
    //     cameraControls();
    //     yield;
    //   }
    //   uiElements.splice(confirmMenuIndex, 1);
    //   // 3) Add status effect
    //   nearbyTargets
    //     .map(getCharacterAtHex)
    //     .filter(x => x)
    //     .forEach(([, , , status]) => status.push({
    //       type: `shield`,
    //       duration,
    //       percentage,
    //     }));
    //   // 4) Play animation
    // }()]),
    // magic: (character, { name, range, effect }) => ([name, () => selectedAction = (function* () {
    //   const [data, , position] = character;
    //   // 1) Detect & display all eligible characters
    //   clear(optionHexes);
    //   const nearbyTargets = [getNearbyAllies(position, range), getNearbyEnemies(position, range)];
    //   optionHexes.push(...nearbyTargets);
    //   // 2) Select Target
    //   let selectedTarget = null;
    //   while(!selectedTarget) {
    //     cameraControls();
    //     const { click, mousePosition } = inputs;
    //     if(click === 1) {
    //       state.target = getGridHexFromVector2d(
    //         scaleSet(calcWorldPosition(mousePosition), 1 / gridScale)
    //       );
    //       if(contains(optionHexes, state.target)) selectedTarget = getCharacterAtHex(state.target);
    //     }
    //     yield;
    //   }
    //   clear(optionHexes);
    //   // 3) confirm (maybe?)
    //   // Will comeback to this is this seems necessary
    //   // 4) Add status effect
    //   const [tData, , , tStatus] = selectedTarget;
    //   tStatus.push({
    //     name: data.alignment === tData.alignment
    //       ? `hot`
    //       : `dot`,
    //     effect,
    //   });
    //   // 5) Play animation
    // })()]),
  };

  const getCharacter = generateGetCharacter(turnOrder);
  function* Turn() {
    // 1) Determine who's turn it is.
    const { value: character } = getCharacter.next();
    const [data, , position] = character;
    console.log(`------------------------------`);
    console.log(`Start of turn for ${data.name}`);
    // 2) Center Camera on that person.
    const panCamera = moveCharacter(camera, add(cameraOffset, position), 2000);
    console.log(`Paning Camera from ${camera} to ${add(cameraOffset, position)}`);
    while(!panCamera()) yield;
    // 3) Look up actions
    const actions = Object.keys(data.abilities).map(name => action[name](character, data.abilities[name]));
    // 4) Add actions to the menu
    const menuUIIndex = uiElements.push(Menu(actions));
    // 5) Wait for player to select an action.
    selectedAction = null;
    while(!selectedAction) yield;
    uiElements.splice(menuUIIndex - 1, 1);
    // 6) Execute selected action
    while(true) {
      const { done } = selectedAction.next();
      if(done) break;
      else yield;
    }
    // 7) Check to see if battle is over
    const isVictory = false;//!!turnOrder.find(([data, health]) => !data.alignment && health > 0);
    const isDefeat = false;//!isVictory && !!turnOrder.find(([data, health]) => data.alignment && health > 0);
    console.log(`------------------------------`);
    return isVictory ? 1 :
      isDefeat ? 2 :
        0;
  }

  return {
    init: () => {
      camera[2] = 340;
      uiElements.push(StatusBar, BattleMap);
      turn = Turn();
      state.logic = () => {
        // done: is turn over.
        // value: battle status, 0: ongoing, 1: victory, 2: defeat;
        const { value, done } = turn.next();
        if(done && value === 0) {
          // 8) Increment turn counter
          // 9A) Create New turn
          turn = Turn();
        } else if(done && value === 1) {
          // 9B) VICTORY
        } else if(done && value === 2) {
          // 9C) DEFEAT
        }
      };
    },
    dismiss: () => { },
  };
}
