import { TicketListConnected } from "@components/TicketList";
import { ConnectedImportExport } from "./ImportExport";
import { CodePage } from "./Code";
import { CreateCodeConnect } from "./Code/CreateCode";

export const paths = {
    feed: {
        path: '/feed',
        component: TicketListConnected
    },
    import_export: {
        path: '/import_export',
        component: ConnectedImportExport
    },
    code: {
        path: '/code',
        component: CodePage,
        children: {
            newEntry: {
                path: '/newEntry',
                component: CreateCodeConnect
            }
        }
    }
}