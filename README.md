# MIRS2404_webapp

1. raspi/web/config.iniをエディタで開き、```web_main```項目の```HOST```を自分の環境のIPアドレスに変更
2. raspi/webディレクトリを開く
3. 次のコマンドを実行```pip install -r requirements.txt```
4. 次のコマンドを実行```python3 web_main.py```
5. 別のコマンドプロンプトを開き、raspi/web/socketディレクトリを開いて次のコマンドを実行```python3 raspi_recever.py```
