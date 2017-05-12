import $ from 'jquery';

$(document).ready(() => {
  // For home page
  let links = $('._ljyfo');
  if (links.length < 1) {
    // For other pages
    links = $('._8mlbc');
  }
  const permalinks = [];

  for (let i = 0; i < links.length; i += 1) {
    permalinks.push(links[i].href);
  }
  chrome.runtime.sendMessage({ permalinks });
});
