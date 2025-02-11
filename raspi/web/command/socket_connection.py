import websockets, json
import configparser

#configの読み込み
config_ini = configparser.ConfigParser()
config_ini.read('../config.ini', encoding='utf-8')

async def send_to_raspberry(data):
    url = config_ini.get('socket_connection', 'SEND_TO_RASPI_IP')
    async with websockets.connect(url) as websocket:
        await websocket.send(json.dumps(data))