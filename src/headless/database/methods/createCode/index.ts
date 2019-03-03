import { TicketPouchDb, DocTypes, Code } from "../../PouchWrapper";

export function createCode(db: TicketPouchDb) {
    return async ({ newCode, name }: { newCode: string; name: string; }) => {
        try {
            await db.put<Code>({
                _id: name,
                type: DocTypes.code,
                code: newCode
            });
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}