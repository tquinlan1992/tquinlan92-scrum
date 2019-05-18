import { AppState } from "@headless/store/types";
import { exportTickets } from "./redux/thunkActions/exportTickets";

export const mapStateToProps = (state: AppState) => {
    return {
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    exportTickets
};

export type Actions = typeof mapDispatchToProps;