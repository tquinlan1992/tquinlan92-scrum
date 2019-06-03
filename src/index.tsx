import { store } from './headless';
import { App } from './components/App';

// @ts-ignore
console.log('global.version', global.version);

App(store);
