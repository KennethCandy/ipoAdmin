var ettSessionStorage = null;
function isStorageSupported() {
    var testKey = 'isStorageSupported', storage = window.localStorage;
    try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}
function getSessionStorage() {
    if (ettSessionStorage != null) {
        return ettSessionStorage;
    }
    if (isStorageSupported()) {
        ettSessionStorage = sessionStorage;
    } else {
        ettSessionStorage = new SessoinStorageAlternative();
    }
    return ettSessionStorage;
}
function SessoinStorageAlternative() {
    var structureStorage = {};
    this.setItem = function(key, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + escape(value) + ";expires="
                + exp.toGMTString();
    }
    this.getItem = function(key) {
        var arr = document.cookie.match(new RegExp("(^| )" + key
                + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }
    this.removeItem = function(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires="
                    + exp.toGMTString();
    }
}