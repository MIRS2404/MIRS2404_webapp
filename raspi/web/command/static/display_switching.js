// ボタンの表示切替
export function display_switching(buttonId, state) {
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    if (buttonId == "button1" && state == false) {
        button1.style.display = 'none';
        button2.style.display = 'inline-block';
        button4.style.display = 'none'; //水出し終了ボタン非表示
    } else if (buttonId == "button4" && state == false) {
        button2.style.display = 'none';
        button4.style.display = 'none';
        button1.style.display = 'inline-block';
    }
}