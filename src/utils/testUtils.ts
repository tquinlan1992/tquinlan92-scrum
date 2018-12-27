export function mockPouchDB() {
    jest.mock('../headless/database/pouch', () => {
        return {};
    });
}
