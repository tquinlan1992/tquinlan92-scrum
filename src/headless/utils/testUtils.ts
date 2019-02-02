import { Ticket } from '../database/PouchWrapper';
import * as pouchDBMemoryAdapter from 'pouchdb-adapter-memory';
import * as PouchDB from 'pouchdb-browser';

export function mockPouchDB() {
    jest.mock('../database/core/pouch', () => {
        return {};
    });
}

const pouchdbFind = require('pouchdb-find');
PouchDB.plugin(pouchDBMemoryAdapter);
PouchDB.plugin(pouchdbFind);

export async function getMemoryPouchDb(docs?: Ticket[]) {
    const db = new PouchDB<Ticket>('mydb', { adapter: 'memory' });
    if (docs) {
        docs.forEach(async doc => {
            await db.put(doc);
        })
    }
    return db;
}

