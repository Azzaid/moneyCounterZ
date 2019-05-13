import './styles/index.scss'
import Engine from './engine/index'

const appRoot = document.body;

let mainHeader = document.createElement('h1');
mainHeader.classList.add('main-header');
mainHeader.innerText = 'Welcome! Click on field to add come bals to simulation';
appRoot.appendChild(mainHeader);

const buttonsWrapper = document.createElement('div');
buttonsWrapper.classList.add('buttons-wrapper');
appRoot.appendChild(buttonsWrapper);

const gameFieldWrapper = document.createElement('div');
gameFieldWrapper.classList.add('game-field-wrapper');
appRoot.appendChild(gameFieldWrapper);

const gameEngine = new Engine(gameFieldWrapper, buttonsWrapper);
