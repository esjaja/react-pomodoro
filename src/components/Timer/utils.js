
export function getSeconds(_min = 0, _sec = 0) {
    let min = parseInt(_min), sec = parseInt(_sec);
    if( isFinite(min) && isFinite(sec)) {
        return min * 60 + sec;
    } else {
        throw "getSeconds: min and sec should be number";
    }
}

export function getClock(_sec = 0) {
    let sec = parseInt(_sec);
    if( isFinite(sec) ) {
        let _min = Math.floor(sec / 60);
        let _sec = sec % 60;
        _min = (_min < 10) ? ('0' + _min) : ('' + _min);
        _sec = (_sec < 10) ? ('0' + _sec) : ('' + _sec); 
        return [_min, _sec];
    }
}

