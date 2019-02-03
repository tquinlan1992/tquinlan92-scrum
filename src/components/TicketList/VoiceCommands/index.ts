import { reduxStore } from "@headless/store";
import { addTicketDialogActions } from '@components/AddTicketDialog/redux';

var recognition = new (window as any).webkitSpeechRecognition();
recognition.continuous = true;

function handleSpeech(words: string) {
    const ticketInWords = words.includes('ticket');
    if (ticketInWords) {
        reduxStore.dispatch(addTicketDialogActions.set({ open: true }))
    }
}

recognition.onresult = function (event: any) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            const words = event.results[i][0].transcript;
            handleSpeech(words);
            console.log('here', words);
        }
    }
}

recognition.onerror = function (event: any) {
    console.log(event.error);
};

recognition.start();
