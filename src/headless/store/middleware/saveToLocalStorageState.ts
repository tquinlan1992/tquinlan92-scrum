export default function saveToLocalStorageState(params: { getState: Function; }) {
    return (next: any) => (action: any) => {

        const returnValue = next(action);
        localStorage.setItem('state', JSON.stringify(params.getState()));
        return returnValue;
        
    };
}
