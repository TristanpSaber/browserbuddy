chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('refreshTrends', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshTrends') {
    console.log('Refreshing trends...');
    // You can add logic here to fetch and update trends from a server.
  }
});
