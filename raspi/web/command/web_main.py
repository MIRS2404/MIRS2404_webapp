from flask import Flask, render_template, request, jsonify
import socket_connection as sc
import configparser

app = Flask(__name__)

#configの読み込み
config_ini = configparser.ConfigParser()
config_ini.read('../config.ini', encoding='utf-8')


@app.route("/", methods=["GET"])
def main_page():
    return render_template("index.html")


# ボタンの状態を受け取るエンドポイント
@app.route('/api/button_state', methods=['POST'])
async def receive_button_state():
    data = request.get_json()
    await sc.send_to_raspberry(data)#websocket通信
    return jsonify({'message': '状態を受け取りました'}), 200

if __name__ == '__main__':
    HOST = config_ini.get('web_main', 'HOST')
    PORT = config_ini.get('web_main', 'PORT')

    app.run(host=HOST, port=PORT)
    #デバッグ用コマンド↓
    #flask --app web_main run --host 192.168.1.12 --port 5010 --debug --extra-files templates/*:static/*