import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('@headless/database/pouch', () => {
    return {};
})

jest.mock('react-monaco-editor', () => {
    return {};
})
