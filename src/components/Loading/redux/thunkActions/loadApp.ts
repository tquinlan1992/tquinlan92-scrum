import { AppThunkAction } from "@headless/store";
import { setupPouch } from "@database/pouch";
import * as request from 'superagent';
import * as urljoin from 'url-join';
import { actions as loadingActions } from '@components/Loading/redux'; 
import fetchTickets from '@components/TicketList/redux/thunkActions/fetchTickets';

interface APIConfig {
    cloudant: string;
}

export default function loadApp(): AppThunkAction {
    return async function (dispatch) {
        try {
            const res = await request.get('/static/api.json');
            const apiConfig = res.body as APIConfig;
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
