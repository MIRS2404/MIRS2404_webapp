import { display_switching } from "./display_switching.js";
import { sendButtonState } from "./post.js";
import { startCountdown, stopCountdown } from "./timer.js";
import { showProgressModal } from "./progress_modal.js";

function setupButton(buttonId) {
    const button = document.getElementById(buttonId);
    let isPressed = false;
    let stopModal = null;

    // モーダルの初期化
    if (buttonId === 'button1') {
        stopModal = new bootstrap.Modal(document.getElementById('stopModal'));

        // OKボタンのクリックイベントを一度だけ設定
        document.getElementById('okButton').addEventListener('click', function() {
            display_switching('button1', false);
            sendButtonState('button1', false, false);
            isPressed = false;
            button.classList.remove('pressed');
        });

        // モーダルの外部をクリックした場合もOKボタンを押したときと同じ動作をするように設定
        document.getElementById('stopModal').addEventListener('hidden.bs.modal', function() {
            display_switching('button1', false);
            sendButtonState('button1', false, false);
            isPressed = false;
            button.classList.remove('pressed');
        });
    }

    function startSendingState() {
        if (!isPressed) {
            isPressed = true;
            button.classList.add('pressed');
            sendButtonState(buttonId, true, false);

            if (buttonId === 'button1') {
                stopModal.show();
            }

            if (buttonId === 'button2') {
                startCountdown();
                showProgressModal(); // ここで進捗モーダルを表示
            }

            display_switching(buttonId, true);
        }
    }

    function stopSendingState() {
        if (isPressed && buttonId !== 'button1') {
            isPressed = false;
            button.classList.remove('pressed');
            display_switching(buttonId, false);

            if (buttonId == 'button4') {
                stopCountdown();
                sendButtonState(null, null, true);
            } else {
                sendButtonState(buttonId, false, false);
            }
        }
    }

    // タッチイベント
    button.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startSendingState();
    }, false);

    button.addEventListener('touchend', function(e) {
        e.preventDefault();
        stopSendingState();
    }, false);

    // マウスイベント（デバッグ用）
    button.addEventListener('mousedown', function(e) {
        e.preventDefault();
        startSendingState();
    }, false);

    button.addEventListener('mouseup', function(e) {
        e.preventDefault();
        stopSendingState();
    }, false);

    button.addEventListener('mouseleave', function(e) {
        e.preventDefault();
        stopSendingState();
    }, false);
}

window.addEventListener('load', function() {
    setupButton('button1');
    setupButton('button2');
    setupButton('button4');
});
