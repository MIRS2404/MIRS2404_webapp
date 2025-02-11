let countdownTimer;
let remainingTime;
let setTime = 32; // タイマーの設定時間
let bar; // プログレスバーのインスタンス
let isButtonHeld = false; // 「水を出す」ボタンが押されているかどうかのフラグ

// プログレスバーの初期化
function initializeProgressBar() {
    if (!bar) {
        bar = new ProgressBar.Circle('#progress-container', {
            strokeWidth: 6,
            easing: 'linear', // 等速で動かす
            duration: 5000, // プログレスバーは5秒間で減少
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: {
                strokeLinecap: 'round' // バーの端を丸くする
            },
            text: {
                value: `<div style="font-size: 1rem; color: #666; text-align: center;">移動開始まで</div><div style="font-size: 3rem; color: #333; text-align: center;">5</div>`,
                style: {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    padding: 0,
                    margin: 0,
                    transform: {
                        prefix: true,
                        value: 'translate(-50%, -50%)'
                    },
                    textAlign: 'center'
                }
            }
        });

        // 初期状態で透明に設定（opacity: 0）
        const progressBarContainer = document.getElementById('progress-container');
        if (progressBarContainer) {
            progressBarContainer.style.opacity = '0';
            progressBarContainer.style.visibility = 'hidden';
            progressBarContainer.style.transition = 'opacity 1s ease-in-out'; // フェード用のトランジション設定
        }
    }
}

// プログレスバーをフェードインする関数
function fadeInProgressBar() {
    const progressBarContainer = document.getElementById('progress-container');
    if (progressBarContainer) {
        progressBarContainer.style.visibility = 'visible';
        setTimeout(() => {
            progressBarContainer.style.opacity = '1';
        }, 10); // visibilityが適用されるのを待ってからopacityを変更
    }
}

// プログレスバーを即座に透明にする関数（フェードなし）
function hideProgressBarImmediately() {
    const progressBarContainer = document.getElementById('progress-container');
    if (progressBarContainer) {
        progressBarContainer.style.transition = ''; // トランジションを無効化
        progressBarContainer.style.opacity = '0';
        progressBarContainer.style.visibility = 'hidden'; // 完全に透明
        setTimeout(() => {
            progressBarContainer.style.transition = 'opacity 1s ease-in-out'; // トランジションを再設定
        }, 10); // 次回フェードが必要な場合に備えて、少し待ってから再設定
    }
}

// カウントダウン開始
export function startCountdown() {
    initializeProgressBar();
    hideProgressBarImmediately(); // タイマーリセット時に即座に透明に

    // タイマーが既に動作中の場合はリセット
    if (countdownTimer) {
        clearInterval(countdownTimer);
        remainingTime = setTime; // 残り時間をリセット
        bar.set(1); // プログレスバーを満タンにリセット
        bar.setText(`<div style="font-size: 1rem; color: #666; text-align: center;">移動開始まで</div><div style="font-size: 3rem; color: #333; text-align: center;">5</div>`);
    }

    // カウントダウン開始
    remainingTime = setTime;

    countdownTimer = setInterval(() => {
        remainingTime--;

        // 残り5秒になったらフェードインしつつプログレスバーのアニメーションを開始
        if (remainingTime === 5) {
            fadeInProgressBar();
            bar.set(1); // プログレスバーを満タンに設定
            bar.animate(0); // 5秒間でバーが減少
        }

        // プログレスバーの中央テキストを更新
        if (remainingTime <= 5) {
            bar.setText(`<div style="font-size: 1rem; color: #666; text-align: center;">移動開始まで</div><div style="font-size: 3rem; color: #333; text-align: center;">${remainingTime}</div>`);
        }

        // カウントダウン終了処理
        if (remainingTime <= 0) {
            clearInterval(countdownTimer);
            bar.set(0); // プログレスバーを空に
            bar.setText(''); // テキストも空に
            hideProgressBarImmediately(); // カウントダウン終了時に即座に透明に

            // button4要素を取得してクリックイベントを発火
            const button4 = document.getElementById('button4');
            const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window });
            const mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window });
            
            button4.dispatchEvent(mousedownEvent);
            button4.dispatchEvent(mouseupEvent);
        }
    }, 1000);
}

// カウントダウン停止
export function stopCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
    hideProgressBarImmediately(); // リセット時に即座に透明に
    if (bar) {
        bar.set(1); // プログレスバーを満タンにリセット
        bar.setText(`<div style="font-size: 1rem; color: #666; text-align: center;">移動開始まで</div><div style="font-size: 3rem; color: #333; text-align: center;">5</div>`);
    }
    remainingTime = setTime; // 残り時間をリセット
}

// 「水を出す」ボタンの表示を監視してカウントダウンを開始する
const waterButton = document.getElementById('button2');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // ボタンが表示されるたびにタイマーを開始
            startCountdown();
        }
    });
});

// 「水を出す」ボタンの表示を監視
observer.observe(waterButton);

// 「水を出す」ボタンを押し続けている間、タイマーをリセット
waterButton.addEventListener('mousedown', () => {
    isButtonHeld = true;

    // ボタンを押し続けている間、タイマーをリセット
    const holdInterval = setInterval(() => {
        if (isButtonHeld) {
            stopCountdown(); // タイマーを停止してリセット
        } else {
            clearInterval(holdInterval); // ボタンが離されたら停止
            startCountdown(); // ボタンを離した時にカウントダウン開始
        }
    }, 100); // 100msごとにリセット
});

waterButton.addEventListener('mouseup', () => {
    isButtonHeld = false;
});

waterButton.addEventListener('mouseleave', () => {
    isButtonHeld = false;
});

// 「水出し終了」ボタンが押されたときにプログレスバーを即座に透明にする
document.getElementById('button4').addEventListener('click', () => {
    hideProgressBarImmediately();
});

// 「停止」ボタンが押されたときにプログレスバーを表示する（フェードなし）
document.getElementById('button1').addEventListener('click', () => {
    fadeInProgressBar();
});
