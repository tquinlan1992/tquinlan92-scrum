import { TicketListConnected } from "@components/TicketList";
import { ConnectedImportExport } from "@components/ImportExport";
import React from 'react';
import { ClosedTicketsConnected } from "@components/ClosedTickets/ClosedTickets";

export const paths = {
    feed: {
        path: '/feed',
        component: TicketListConnected
    },
    import_export: {
        path: '/import_export',
        component: ConnectedImportExport
    },
    closed: {
        path: '/closed',
        component: ClosedTicketsConnected
    }
}