window.addEventListener('load', function () {
  setTimeout(function () {
    const performance = window.performance;
    if (performance) {
      let t: any = performance.getEntriesByType('navigation')[0];
      let r = 0;
      t || (r = (t = performance.timing).navigationStart);
      const statistics = [{
        key: 'Redirect',
        desc: '网页重定向的耗时',
        value: t.redirectEnd - t.redirectStart
      }, {
        key: 'AppCache',
        desc: '检查本地缓存的耗时',
        value: t.domainLookupStart - t.fetchStart
      }, {
        key: 'DNS',
        desc: 'DNS查询的耗时',
        value: t.domainLookupEnd - t.domainLookupStart
      }, {
        key: 'TCP',
        desc: 'TCP连接的耗时',
        value: t.connectEnd - t.connectStart
      }, {
        key: 'Waiting(TTFB)',
        desc: '从客户端发起请求到接收到响应的时间 / Time To First Byte',
        value: t.responseStart - t.requestStart
      }, {
        key: 'Content Download',
        desc: '下载服务端返回数据的时间',
        value: t.responseEnd - t.responseStart
      }, {
        key: 'HTTP Total Time',
        desc: 'http请求总耗时',
        value: t.responseEnd - t.requestStart
      }, {
        key: 'DOMContentLoaded',
        desc: 'dom加载完成的时间',
        value: t.domContentLoadedEventEnd - r
      }, {
        key: 'Loaded',
        desc: '页面load的总耗时',
        value: t.loadEventEnd - r
      }];
      const result = {
        userAgent: navigator.userAgent,
        location,
        statistics,
      }
      console.log('statistics', result);
    }
  }, 0);
});

export {};
