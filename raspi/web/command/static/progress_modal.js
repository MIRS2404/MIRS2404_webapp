// progress_modal.js

// プログレスバーの設定
const PROGRESS_CONFIG = {
    totalDurationSeconds: 20,  // バーが100%になるまでの時間（秒）
    updateIntervalMs: 20      // 更新間隔（ミリ秒）
};

export function showProgressModal() {
    const progressModalElement = document.getElementById('progressModal');
    const progressModal = new bootstrap.Modal(progressModalElement);

    const progressContainer = document.querySelector('.progress');
    const progressBar = document.getElementById('progressBar');
    const waterMessage = document.getElementById('waterMessage');

    // 1回の更新で増加するプログレスの割合を計算
    const totalUpdates = (PROGRESS_CONFIG.totalDurationSeconds * 1000) / PROGRESS_CONFIG.updateIntervalMs;
    const incrementPerUpdate = 100 / totalUpdates;

    progressBar.style.width = '0%';
    progressContainer.style.opacity = '1';
    waterMessage.style.opacity = '0';
    waterMessage.style.display = 'none';

    // モーダル全体のフェードイン
    progressModalElement.style.opacity = '0';
    progressModal.show();
    setTimeout(() => {
        progressModalElement.style.transition = 'opacity 0.5s ease';
        progressModalElement.style.opacity = '1';
    }, 10);

    let progress = 0;

    // プログレスバーの進捗
    const interval = setInterval(() => {
        progress += incrementPerUpdate;
        progressBar.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 100) {
            clearInterval(interval);

            // プログレスバー全体をフェードアウト
            progressContainer.style.transition = 'opacity 0.5s ease';
            progressContainer.style.opacity = '0';
            setTimeout(() => {
                progressContainer.style.display = 'none';

                // 「水をどうぞ」のメッセージをフェードイン
                waterMessage.style.display = 'block';
                waterMessage.style.transition = 'opacity 0.5s ease';
                waterMessage.style.opacity = '1';
                setTimeout(() => {
                    // 3秒後にモーダル全体をフェードアウト
                    progressModalElement.style.transition = 'opacity 0.5s ease';
                    progressModalElement.style.opacity = '0';
                    setTimeout(() => {
                        progressModal.hide();

                        // モーダルが閉じた後にリセット処理を実行
                        setTimeout(() => {
                            // 次回用にリセット
                            progressContainer.style.display = '';
                            progressContainer.style.opacity = '1';
                            progressBar.style.width = '0%';
                            waterMessage.style.display = 'none';
                            waterMessage.style.opacity = '0';
                            progressModalElement.style.opacity = '1';
                        }, 500);
                    }, 500);
                }, 3000);
            }, 500);
        }
    }, PROGRESS_CONFIG.updateIntervalMs);
}