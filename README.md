# 環境變數
## buildtime
### docker build args
1. 無
### react app  
1. PUBLIC_URL: \_\_PUBLIC_URL_PLACEHOLDER__，執行期才由 env.sh 帶入
1. REACT_APP_VERSION: 網站顯示版本號，以 package.json 為準 (由 cicd 自動更新)
1. REACT_APP_WEB_UPDATED_AT: 網站更新日期，於 docker build 時由系統帶入
1. 其他: 詳 .env.example
## runtime
 - **預設值**: 詳 .env.example 
 - **配置方式**: 將 .env 掛載進容器，詳 docker-compose.yml

|名稱|必要|說明|
|-|-|-|
PUBLIC_URL|✔️| 例如 /subpath (不須加尾斜槓)
REACT_APP_TGOS_ADDRESS_QUERY_APPID|✔️|地址查詢使用之appId
REACT_APP_TGOS_ADDRESS_QUERY_APIKEY|✔️|地址查詢使用之apiKey
REACT_APP_TGOS_MAP_SERVICE_APPID|✔️|圖資服務所使用的appId
REACT_APP_TGOS_MAP_SERVICE_APIKEY|✔️|圖資服務所使用的apiKey
REACT_APP_STATION_SEARCH_BASEURL| | 站位查詢使用，目前僅支援 elk _search api
REACT_APP_OTP_SERVICE_BASEURL | | OpenTripPlanner web service otp endpoint
REACT_APP_TGOS_ADDRESS_QUERY| | 地址查詢，格式詳下文
REACT_APP_WMTS_PROVIDER| | tgos|nlsc
REACT_APP_TGOS_TILEAGENT_BASEURL| | TGOS圖資服務

## URL格式
 - 以下與URL有關環境變數，其中以大括號包覆之{name}字串，將被程式代換為相對應的值
### REACT_APP_TGOS_ADDRESS_QUERY
 - {appId} REACT_APP_TGOS_ADDRESS_QUERY_APPID
 - {apiKey} REACT_APP_TGOS_ADDRESS_QUERY_APIKEY
 - {address} 輸入的搜尋字詞
# 部署
 - [Drone CI 網址](http://cicd-so-happy.maxwin.com.tw:8080/maxwin-inc/react-app-example)
目前已經設定好drone CI，docker image會自動在drone的主機上建立，只需要將image檔從drone主機上pull下來即可
註: docker private repostry第一次使用需要相關設定，見[網址說明](https://hackmd.io/-Ggi0uxvQpK9nnSz21a-fA#Docker-client)
 - 配置參考 docker-compose.yml
