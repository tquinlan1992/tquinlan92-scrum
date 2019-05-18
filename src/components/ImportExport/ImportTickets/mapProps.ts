import { AppState } from "@headless/store/types";
import { importTickets } from './redux/thunkActions/importTickets';

export const mapStateToProps = (state: AppState) => {
    return {
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    importTickets
};


export type Actions = typeof mapDispatchToProps;