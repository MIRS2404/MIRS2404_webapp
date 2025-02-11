var origin_URL = window.location.href;

//POST
export function sendButtonState(buttonId, button_state, run_state) {
    fetch(origin_URL + '/api/button_state', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'button': buttonId, 'pressed': button_state , 'start': run_state})
    })
    .catch(error => {
        console.error('通信エラー:', error);
    });
}