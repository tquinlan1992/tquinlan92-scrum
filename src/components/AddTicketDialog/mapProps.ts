import { AppState } from '@headless/store/types';
import { storeActions } from '@headless/store';

export interface AddTicketDialogOwnProps {
    onRequestClose: () => void;
    open: boolean;
    onSubmit: () => void;
}

export const mapStateToProps = ({ addTicket }: AppState, ownProps: AddTicketDialogOwnProps) => {
    return {
        ...addTicket,
        ...ownProps
    };
};

export type Props = ReturnType<typeof mapStateToProps>; 

export const mapDispatchToProps = {
    addTicket: storeActions.addTicket.addTicket,
    setAddTicketState: storeActions.addTicket.set,
    reset: storeActions.addTicket.reset
};

export type ComponentActions = typeof mapDispatchToProps;