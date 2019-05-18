import { AppThunkAction } from "@headless/store/types";
import { setupPouch } from "@database/pouch";
import urljoin from 'url-join';
import { fetchTickets } from '@components/TicketList/redux/thunkActions/fetchTickets';
import { storeActions } from "@headless/store";
const parseDomain = require('parse-domain');

interface APIConfig {
    cloudant: string;
}

export function loadApp(subdomainToUse?: string): AppThunkAction {
    return async function (dispatch) {
        try {
            const response = await fetch('/static/api.json');
            const jsonResponse = await response.json();
            const apiConfig = jsonResponse as APIConfig;
            const { subdomain } = parseDomain(window.location.hostname);
            const remoteUrl = urljoin(apiConfig.cloudant, `/${subdomainToUse || subdomain}`);
            const onChanges = async () => {
                await dispatch(fetchTickets());
            };
            await setupPouch({remoteUrl, onChanges});
            await dispatch(fetchTickets());
            dispatch(storeActions.loading.set({value: false}));
        } catch(e) {
            console.log('error loading app', e);
        }
    };
}
