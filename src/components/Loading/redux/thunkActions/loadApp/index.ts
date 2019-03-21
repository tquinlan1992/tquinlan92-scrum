import { AppThunkAction } from "@headless/store";
import { setupPouch } from "@database/pouch";
import urljoin from 'url-join';
import { actions as loadingActions } from '@components/Loading/redux'; 
import { fetchTickets } from '@components/TicketList/redux/thunkActions/fetchTickets';

interface APIConfig {
    cloudant: string;
}

export function loadApp(): AppThunkAction {
    return async function (dispatch) {
        try {
            const response = await fetch('/static/api.json');
            const jsonResponse = await response.json();
            const apiConfig = jsonResponse as APIConfig;
            const remoteUrl = urljoin(apiConfig.cloudant, '/dev');
            const onChanges = () => {
                dispatch(fetchTickets());
            };
            await setupPouch({remoteUrl, onChanges});
            dispatch(fetchTickets());
            dispatch(loadingActions.set({value: false}));
        } catch(e) {
            console.log('error loading app', e);
        }
    };
}
