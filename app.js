function getStationId() {
    var radios = document.getElementsByName('stop');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            var stationId = radios[i].value;
            break;
        }
    }
    return stationId;
}

function tim(busId) {
    var xhttp = new XMLHttpRequest({mozSystem: true});
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            var text = 'S=' + obj.dt[0].PartRemained + ' T=' + obj.dt[0].TimeRemained
            document.getElementById(busId).innerHTML = text;
        }
    };
    var url = 'http://timbus.vn/Engine/Business/Vehicle/action.ashx';
    xhttp.open('POST', url, true);
    xhttp.withCredentials = false;
    xhttp.setRequestHeader('Referer', 'http://timbus.vn/');
    xhttp.setRequestHeader('Accept-Encoding', 'gzip, deflate');
    xhttp.setRequestHeader('Accept-Language', 'en-GB,en-US;q=0.9,en;q=0.8');
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhttp.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
    xhttp.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.116');
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('Origin', 'http://timbus.vn');
    var stationId = getStationId();
    xhttp.send('act=partremained&State=false&StationID=' + stationId + '&FleetOver=' + busId);
}

document.getElementById('btn').addEventListener('click', function(){
    tim('26');
    tim('47B');
}); 
