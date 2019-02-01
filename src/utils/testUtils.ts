export function mockPouchDB() {
    jest.mock('../headless/database/pouch', () => {
        return {};
    });
}

export function mockPouch(dbMethods: object) {
    jest.mock('../headless/database/pouch', () => {
        return {

        }
    })
    const mockPouchRequire = require('../headless/database/pouch');
    const mockGetRemoteDb = jest.fn(() => {
        return new Promise(resolve => {
            resolve(dbMethods);
        })
    });
    mockPouchRequire.getRemoteDb = mockGetRemoteDb;
    return mockPouchRequire;
}

