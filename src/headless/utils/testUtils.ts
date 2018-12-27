export function mockPouchDB() {
    jest.mock('../database/core/pouch', () => {
        return {};
    });
}
