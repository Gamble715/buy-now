chrome.storage.local.get('products', (obj) => {
  let products = obj.products;
  if (products) {
    products = JSON.parse(products);
    const len = products.length;
    if (len > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {
    // Initial
    chrome.browserAction.setBadgeText({ text: '0' });
  }
});
