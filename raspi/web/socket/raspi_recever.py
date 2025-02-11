import asyncio
import websockets
import json
import configparser

#configの読み込み
config_ini = configparser.ConfigParser()
config_ini.read('../config.ini', encoding='utf-8')

async def echo(websocket, path):
    async for server_data in websocket:
        data = json.loads(server_data)
        print(f"受け取ったメッセージ: {data}")
        await control(data)

async def control(data):
    if data['button'] == 'button1' and data['pressed'] == True:
        print("止まります")
        #button1が押されたときの動作

    if data['button'] == 'button2' and data['pressed'] == True:
        print("水出し中")
        #button2が押されたときの動作
    
    if data['button'] == 'button2' and data['pressed'] == False:
        print("水出し終了")
        #button2が話されたときの動作

    if data['start'] == True:
        print("走り出します")
        #button3が押されたときの動作

async def main():
    host = config_ini.get('raspi_recever', 'HOST')
    port = config_ini.get('raspi_recever', 'PORT')
    async with websockets.serve(echo, host, port):
        print(f"IP {host},ポート{port}で待機")
        await asyncio.Future()  # 無限に待つ

if __name__ == "__main__":
    asyncio.run(main())