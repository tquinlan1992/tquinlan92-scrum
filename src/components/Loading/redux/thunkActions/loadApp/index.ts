import { AppThunkAction } from "@headless/store";
import { setupPouch } from "@database/pouch";
import urljoin from 'url-join';
import { actions as loadingActions } from '@components/Loading/redux'; 
import { fetchTickets } from '@components/TicketList/redux/thunkActions/fetchTickets';

interface APIConfig {
    cloudant: string;
}

export function loadApp(subdomainToUse?: string): AppThunkAction {
    return async function (dispatch) {
        try {
            const response = await fetch('/static/api.json');
            const jsonResponse = await response.json();
            const apiConfig = jsonResponse as APIConfig;
            const subdomain = window.location.hostname.split('.')[0];
            const remoteUrl = urljoin(apiConfig.cloudant, `/${subdomainToUse || subdomain}`);
            const onChanges = async () => {
                await dispatch(fetchTickets());
            };
            await setupPouch({remoteUrl, onChanges});
            await dispatch(fetchTickets());
            dispatch(loadingActions.set({value: false}));
        } catch(e) {
            console.log('error loading app', e);
        }
    };
}
