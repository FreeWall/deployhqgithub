var Settings = function() {

    var _this = this;
    this.values = {};
    this.onChangeCallback = function() {};

    this.install = function() {
        for (let i in Settings.VALUES) {
            this.values[Settings.VALUES[i]] = true;
        }
        this.save();
    };

    this.load = function(callback) {
        let keys = [];
        for(let i in Settings.VALUES){
            keys.push(Settings.VALUES[i]);
        }
        chrome.storage.sync.get(keys, function(result) {
            _this.values = result;
            if (typeof callback === "function") {
                callback();
            }
        });
    };

    this.save = function() {
        chrome.storage.sync.set(this.values);
        this.onChangeCallback();
    };

    this.set = function(key, value) {
        this.values[key] = value;
        this.save();
    };

    this.get = function(key) {
        return this.values[key];
    };

    this.onChange = function(callback) {
        this.onChangeCallback = callback;
    };
};

Settings.FULL_WIDTH = "fullWidth";
Settings.STYLE_PULL_REQUESTS = "stylePullRequests";
Settings.DRAFTS_TO_BOTTOM = "draftsToBottom";
Settings.UPDATED_SORT = "updatedSort";
Settings.DEPLOYMENTS = "deployments";

Settings.VALUES = [
    Settings.FULL_WIDTH,
    Settings.STYLE_PULL_REQUESTS,
    Settings.DRAFTS_TO_BOTTOM,
    Settings.UPDATED_SORT,
    Settings.DEPLOYMENTS
];

Settings.STYLES = {
    [Settings.FULL_WIDTH]: "static/styles/fullwidth.css",
    [Settings.STYLE_PULL_REQUESTS]: "static/styles/pullrequests.css",
    [Settings.DEPLOYMENTS]: "static/styles/deployments.css",
};