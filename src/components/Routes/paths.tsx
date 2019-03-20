import { TicketListConnected } from "@components/TicketList";
import { ConnectedImportExport } from "./ImportExport";

export const paths = {
    feed: {
        path: '/feed',
        component: TicketListConnected
    },
    import_export: {
        path: '/import_export',
        component: ConnectedImportExport
    }
}