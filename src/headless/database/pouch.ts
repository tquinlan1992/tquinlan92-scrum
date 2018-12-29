import * as PouchDBRaw from 'pouchdb-browser';
import PouchWrapper, { Ticket } from './PouchWrapper';
import { MethodsReturnTypes } from './methods';
const PouchDB: typeof PouchDBRaw = (PouchDBRaw as any).default;
const pouchdbFindRaw = require('pouchdb-find');
const pouchdbFind = pouchdbFindRaw.default as typeof pouchdbFindRaw;
PouchDB.plugin(pouchdbFind);

let pouchDBActions: null | MethodsReturnTypes;

export async function getRemoteDB() {
    return pouchDBActions as MethodsReturnTypes;
}

export function setupPouch({ remoteUrl, onChanges }: { remoteUrl: string; onChanges: () => void;}) {
    return new Promise(async (resolve, reject) => {
        if (!pouchDBActions) {
            const remoteDB = await new PouchDB<Ticket>(remoteUrl);
            remoteDB.changes({live: true, since: 'now'}).on('change', (changes) => {
                console.log('got to changes');
                onChanges();
                resolve();
            }).catch(err => {
                reject('error syncing');
            });
            pouchDBActions = new PouchWrapper({
                pouchDb: remoteDB
            }).actions;
            remoteDB.info().then(function (info) {
                console.log(info);
                resolve();
            });
        }
    });
}
