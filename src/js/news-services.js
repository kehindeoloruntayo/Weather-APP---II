export default class BreakingNews {
    static getBreakingNews() {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            const url = `https://newsdata.io/api/1/news?apikey=pub_30063d826b736b1a3d58ecd9917e74af88cdc&q=pegasus&language=en`;
            request.onload = function () {
                if (this.status === 200) {
                    resolve(request.response);
                } else {
                    reject(request.response);
                }
            };
            request.open("GET", url, true);
            request.send();
        });
    }
}