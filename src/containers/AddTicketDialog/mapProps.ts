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
    reset: storeActions.addTicket.reset,
    updateStoryPoint: storeActions.addTicket.storyPoint,
    updateDescription: storeActions.addTicket.description,
    updateTitle: storeActions.addTicket.title
};

export type ComponentActions = typeof mapDispatchToProps;