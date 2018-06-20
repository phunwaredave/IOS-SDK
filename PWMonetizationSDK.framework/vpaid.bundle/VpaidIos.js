"use strict";

var VpaidIos = (function (){
    var Player = function (config){
        var scope = this;
        var soundBtn = null;
        this.__sound = "off";
        this.__config = config;
        this.imgs = {
            sound: {
                on: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1OCIgaGVpZ2h0PSI1OCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PGNpcmNsZSBzdHlsZT0iZmlsbDojMzg0NTRGOyIgY3g9IjI5LjUwNDQ4MTQ0OTcyMzI0NCIgY3k9IjI5IiByPSIyOSIgaWQ9InN2Z18xIiBjbGFzcz0iIi8+PHBhdGggc3R5bGU9IiIgZD0iTTE4LjQyNywyMGgtOC4zMjNDOC45NDIsMjAsOCwyMC45NDIsOCwyMi4xMDR2MTIuNzkzQzgsMzYuMDU4LDguOTQyLDM3LDEwLjEwNCwzN2g4LjMyMyAgYzAuMzc1LDAsMC43NDMsMC4xLDEuMDY3LDAuMjlMMzIuODMsNDkuNzA2QzM0LjIzMiw1MC41MzEsMzYsNDkuNTIsMzYsNDcuODkzVjkuMTA3YzAtMS42MjctMS43NjgtMi42MzgtMy4xNy0xLjgxM0wxOS40OTQsMTkuNzEgIEMxOS4xNywxOS45LDE4LjgwMiwyMCwxOC40MjcsMjB6IiBpZD0ic3ZnXzIiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIHN0eWxlPSIiIGQ9Ik0zOC4yNjE3ODg1NzgwODk4NSwzNi41MDAxMjU4NzIyOTQyMzQgYy0wLjE3MTYwMjExOTI2Njc5NzY2LDAgLTAuMzQzMjA0MjM4NTMzNTk1NDQsLTAuMDc3MzY4Njg3MzgzNjE0NDcgLTAuNDczOTE2NzkwMzE4ODUzLC0wLjIzMTMxNjU4NTc0ODk2OTA0IGMtMC4yNjIwOTU0MjQzNDg4OTgxLC0wLjMwODY4NTI3MzEzMjU4NDIgLTAuMjYyMDk1NDI0MzQ4ODk4MSwtMC44MDc2MzQzNTkxMTY3MDcgMCwtMS4xMTYzMTk2MzIyNDkyOTA1IGMyLjg4MDM2ODM4NDcyNDMzNCwtMy4zOTIzODAwOTg4NTA5MTg3IDIuODgwMzY4Mzg0NzI0MzM0LC04LjkxMjM5OTEwMDc1MTIyOCAwLC0xMi4zMDQ3NzkxOTk2MDIxNDggYy0wLjI2MjA5NTQyNDM0ODg5ODEsLTAuMzA4Njg1MjczMTMyNTg0MiAtMC4yNjIwOTU0MjQzNDg4OTgxLC0wLjgwNzYzNDM1OTExNjcwNyAwLC0xLjExNjMxOTYzMjI0OTI5MDUgczAuNjg1NzM4MTU2Mjg4ODA4MiwtMC4zMDg2ODUyNzMxMzI1ODQyIDAuOTQ3ODMzNTgwNjM3NzAyNSwwIGMzLjQwMzIxODU5MTg2NTM1ODQsNC4wMDgxNzE2OTIzMTIzMzggMy40MDMyMTg1OTE4NjUzNTg0LDEwLjUyOTI0Njc3MTc4ODM5IDAsMTQuNTM3NDE4NDY0MTAwNzMgQzM4LjYwNDk5MjgxNjYyMzQ1LDM2LjQyMjc1NzE4NDkxMDYyIDM4LjQzMzM5MDY5NzM1NjY2LDM2LjUwMDEyNTg3MjI5NDIzNCAzOC4yNjE3ODg1NzgwODk4NSwzNi41MDAxMjU4NzIyOTQyMzQgeiIgaWQ9InN2Z18zIiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48cGF0aCBzdHlsZT0iIiBkPSJNNDMuMDc1NjIxNjI5NTM0NjUsMzkuOTYxMDY5MzMyNTM1NDQ1IGMtMC4yMjM5MDUwNDg1ODEwOTc4NiwwIC0wLjQ0NzgxMDA5NzE2MjE5NTcsLTAuMTEzMDcwNjIxODQ0NTE0NDggLTAuNjE4MzYyNzcwODg2MDgyMiwtMC4zMzgwNTgwODM2Nzc5ODc3IGMtMC4zNDE5Nzk5NzY1NDM3ODYxLC0wLjQ1MTEyODcwNTUyMjQ5OTkgLTAuMzQxOTc5OTc2NTQzNzg2MSwtMS4xODAzMTg4MzgyMzQwNTMzIDAsLTEuNjMxNDQ3NTQzNzU2NTUxNyBjMy43NTgyODEyMjU1OTc1NjEzLC00Ljk1NzgwMDYzMzMyNTI0NiAzLjc1ODI4MTIyNTU5NzU2MTMsLTEzLjAyNTA0MzM2NzM3NDYxMyAwLC0xNy45ODI4NDQwMDA2OTk4NjMgYy0wLjM0MTk3OTk3NjU0Mzc4NjEsLTAuNDUxMTI4NzA1NTIyNDk5OSAtMC4zNDE5Nzk5NzY1NDM3ODYxLC0xLjE4MDMxODgzODIzNDA1MzMgMCwtMS42MzE0NDc1NDM3NTY1NTE3IHMwLjg5NDc0NTU2NTIyODM4MDcsLTAuNDUxMTI4NzA1NTIyNDk5OSAxLjIzNjcyNTU0MTc3MjE1NSwwIGM0LjQ0MDQ5MTkyMDQ5MzA5MSw1Ljg1Nzc1MDQ4MDY1OTEzMDUgNC40NDA0OTE5MjA0OTMwOTEsMTUuMzg3OTg4NjA3NTUzODM1IDAsMjEuMjQ1NzM5MDg4MjEyOTY4IEM0My41MjM0MzE3MjY2OTY4NSwzOS44NDc5OTg3MTA2OTA5NDUgNDMuMjk5NTI2Njc4MTE1NzYsMzkuOTYxMDY5MzMyNTM1NDQ1IDQzLjA3NTYyMTYyOTUzNDY1LDM5Ljk2MTA2OTMzMjUzNTQ0NSB6IiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGlkPSJzdmdfMjIiLz48ZyBpZD0ic3ZnXzQiPjwvZz48ZyBpZD0ic3ZnXzUiPjwvZz48ZyBpZD0ic3ZnXzYiPjwvZz48ZyBpZD0ic3ZnXzciPjwvZz48ZyBpZD0ic3ZnXzgiPjwvZz48ZyBpZD0ic3ZnXzkiPjwvZz48ZyBpZD0ic3ZnXzEwIj48L2c+PGcgaWQ9InN2Z18xMSI+PC9nPjxnIGlkPSJzdmdfMTIiPjwvZz48ZyBpZD0ic3ZnXzEzIj48L2c+PGcgaWQ9InN2Z18xNCI+PC9nPjxnIGlkPSJzdmdfMTUiPjwvZz48ZyBpZD0ic3ZnXzE2Ij48L2c+PGcgaWQ9InN2Z18xNyI+PC9nPjxnIGlkPSJzdmdfMTgiPjwvZz48L2c+PC9zdmc+",
                off: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1OCIgaGVpZ2h0PSI1OCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PGNpcmNsZSBzdHlsZT0iZmlsbDojMzg0NTRGOyIgY3g9IjI5LjUwNDQ4MTQ0OTcyMzI0NCIgY3k9IjI5IiByPSIyOSIgaWQ9InN2Z18xIiBjbGFzcz0iIi8+PHBhdGggc3R5bGU9IiIgZD0iTTE4LjQyNywyMGgtOC4zMjNDOC45NDIsMjAsOCwyMC45NDIsOCwyMi4xMDR2MTIuNzkzQzgsMzYuMDU4LDguOTQyLDM3LDEwLjEwNCwzN2g4LjMyMyAgYzAuMzc1LDAsMC43NDMsMC4xLDEuMDY3LDAuMjlMMzIuODMsNDkuNzA2QzM0LjIzMiw1MC41MzEsMzYsNDkuNTIsMzYsNDcuODkzVjkuMTA3YzAtMS42MjctMS43NjgtMi42MzgtMy4xNy0xLjgxM0wxOS40OTQsMTkuNzEgIEMxOS4xNywxOS45LDE4LjgwMiwyMCwxOC40MjcsMjB6IiBpZD0ic3ZnXzIiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxnIGlkPSJzdmdfNCI+PC9nPjxnIGlkPSJzdmdfNSI+PC9nPjxnIGlkPSJzdmdfNiI+PC9nPjxnIGlkPSJzdmdfNyI+PC9nPjxnIGlkPSJzdmdfOCI+PC9nPjxnIGlkPSJzdmdfOSI+PC9nPjxnIGlkPSJzdmdfMTAiPjwvZz48ZyBpZD0ic3ZnXzExIj48L2c+PGcgaWQ9InN2Z18xMiI+PC9nPjxnIGlkPSJzdmdfMTMiPjwvZz48ZyBpZD0ic3ZnXzE0Ij48L2c+PGcgaWQ9InN2Z18xNSI+PC9nPjxnIGlkPSJzdmdfMTYiPjwvZz48ZyBpZD0ic3ZnXzE3Ij48L2c+PGcgaWQ9InN2Z18xOCI+PC9nPjwvZz48L3N2Zz4="
            }
        };
        this.events = {
            AdLoaded: function (){
                scope.__player.startAd();
            },
            AdStarted: function (){
                scope.onEventPlayer("creativeView");
                var videoSlot = scope.__player.videoSlot_;
                videoSlot.setAttribute('webkit-playsinline', 'webkit-playsinline');
                videoSlot.setAttribute('playsinline', 'playsinline');
                var sound = parseInt(config['sound']) || 0;
                console.log(videoSlot,sound);
                if(videoSlot){
                    switch(sound){
                        case 0:
                            scope.setAdVolume('off');
                            videoSlot.onclick = function (){
                                scope.setAdVolume(scope.__sound === "on" ? 'off' : 'on');
                            };
                            break;
                        case 1:
                            scope.setAdVolume('on');
                            break;
                    }
                }
            },
            AdVideoStart: function (){
                scope.onEventPlayer("start");
            },
            AdVideoFirstQuartile: function (){
                scope.onEventPlayer("firstQuartile");
            },
            AdVideoMidpoint: function (){
                scope.onEventPlayer("midpoint");
            },
            AdVideoThirdQuartile: function (){
                scope.onEventPlayer("thirdQuartile");
            },
            AdVideoComplete: function (){
                scope.onEventPlayer("complete");
                scope.__player.videoSlot_.pause();
                hidePlayer();
            },
            AdSkipped: function (){
                scope.onEventPlayer("skip");
                scope.__player.stopAd();
            },
            AdStopped: function (){
                scope.__player.videoSlot_.pause();
                hidePlayer();
                scope.onEventPlayer("close");
            },
            AdVolumeChanged: function (){
                scope.onEventPlayer(scope.__sound === 'on' ? "unmute" : "mute");
            }
        };

        this.createPlayer = function (){
            return createVpaidPlayer(this.__config['vpaid'], this.__config['adParameters'], function (getVPAIDAd, adParameters){
                var player = (typeof getVPAIDAd === 'function' && getVPAIDAd());
                if(player){
                    for(var event in scope.events){
                        player.subscribe(scope.events[event], event);
                    }
                    scope.__blockPlayer = createBlockPlayer();
                    scope.__player = player;
                    scope.__player.handshakeVersion("2.0");
                    scope.__player.initAd(
                        parseInt(window.innerWidth),
                        parseInt(window.innerHeight),
                        'normal',
                        parseInt(1500),
                        {AdParameters: adParameters},
                        {slot: scope.__blockPlayer}
                    );
                }
            },scope.__config['errorCb']);

        };

        this.htmlRender = {
            soundBlock: function (state){
                if(!soundBtn){
                    soundBtn = document.createElement("img");
                    soundBtn.setAttribute("style", "position: absolute; bottom: 12px; left: 13px; width: 26px; height: 26px; cursor: pointer;");
                    soundBtn.onclick = function (){
                        scope.setAdVolume(scope.__sound === "on" ? 'off' : 'on');
                    };
                    scope.__blockPlayer.appendChild(soundBtn);
                }
                soundBtn.setAttribute("src", scope.imgs.sound[state]);
                return soundBtn;
            }
        };

        this.onEventPlayer = function (event){
            window.webkit.messageHandlers.vpaidEvent.postMessage(event);
        };

        this.setAdVolume = function (state, hideButton){
            if(!hideButton){
                this.htmlRender.soundBlock(state);
            }
            var value = {on: 0.3, off: 0};
            this.__sound = state;
            this.__player && this.__player.setAdVolume(value[state]);
            (this.__player && this.__player.videoSlot_) && (this.__player.videoSlot_.volume = value[state]);
        };

        function createVpaidPlayer(url, adParams, callback,errorCb){
            var iframe = document.createElement('iframe');
            iframe.id = "adloaderframe_" + (new Date()).getTime();
            iframe.setAttribute("style", "display:none");
            document.body.appendChild(iframe);

            var scParam = document.createElement("script");
            scParam.innerHTML = "var adParameters = " + adParams + ";";
            iframe.contentWindow.document.body.appendChild(scParam);
            var scPlayer = document.createElement("script");
            scPlayer.setAttribute("src", url);
            scPlayer.onload = function (){
                var getVPAIDAd = iframe.contentWindow['getVPAIDAd'];
                var adParameters = JSON.stringify(iframe.contentWindow['adParameters']);
                if(getVPAIDAd && adParameters && typeof callback === 'function'){
                    callback(getVPAIDAd, adParameters);
                }
            };
            scPlayer.onerror = function () {
                return errorCb('Error creating vpaid');
            };
            iframe.contentWindow.document.body.appendChild(scPlayer);
        }

        function createBlockPlayer(){
            var body = window.document.body;
            body.style.padding = '0px';
            body.style.margin = '0px';
            body.style.overflow = 'hidden';
            body.style.backgroundColor = '#000';
            return body;
        }

        function hidePlayer(){
            scope.__blockPlayer.style.display = 'none';
        }

        function checkRunVideo() {
            var errorCb =  scope.__config['errorCb'];
            if(!scope.__player || scope.__player.videoSlot_.duration == 0){
                return errorCb('Video does not run');
            }
        }

        scope.__config['timerCheckRunVideo'] = setTimeout(function () {
                checkRunVideo();
        },5*1000);

        scope.createPlayer();
    };

    return {
        isValidConfig: function (config) {
            return (config &&
                    typeof(config['vpaid']) === 'string' &&
                    config['vpaid'].indexOf('.js') !== -1 &&
                    typeof(config['adParameters']) === 'string'  &&
                    config['adParameters'].indexOf('{') !== -1 && config['adParameters'].indexOf('}') !== -1
            );
        },

        init: function (config) {
            var player = new Player(config);
        }
    }
});

function runVpaidIos(config) {
    var config = config;
    var vpaid = new VpaidIos();
    config['errorCb'] = function (err) {
        window.webkit.messageHandlers.vpaidError.postMessage(err || "Unknown error");
    };
    if(!vpaid.isValidConfig(config)){
        return config['errorCb']('Invalid config');
    };
    vpaid.init(config);
    return vpaid;
}
