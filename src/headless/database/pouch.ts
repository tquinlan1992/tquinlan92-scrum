import * as PouchDBRaw from 'pouchdb-browser';
import PouchWrapper, { Ticket } from './PouchWrapper';
const PouchDB: typeof PouchDBRaw = (PouchDBRaw as any).default;
const pouchdbFindRaw = require('pouchdb-find');
const pouchdbFind = pouchdbFindRaw.default as typeof pouchdbFindRaw;
PouchDB.plugin(pouchdbFind);

let pouchDB: null | PouchWrapper;

export async function getRemoteDB() {
    return pouchDB as PouchWrapper;
}

export function setupPouch({ remoteUrl, onChanges }: { remoteUrl: string; onChanges: () => void;}) {
    return new Promise(async (resolve, reject) => {
        if (!pouchDB) {
            const remoteDB = await new PouchDB<Ticket>(remoteUrl);
            remoteDB.changes({live: true, since: 'now'}).on('change', (changes) => {
                console.log('got to changes');
                onChanges();
                resolve();
            }).catch(err => {
                reject('error syncing');
            });
            pouchDB = new PouchWrapper({
                pouchDB: remoteDB
            });
            remoteDB.info().then(function (info) {
                console.log(info);
                resolve();
            });
        }
    });
}
