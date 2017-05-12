function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// products unmarked count
function setBadge(products) {
  if (chrome.browserAction) {
    const count = products.data.length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '0' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.products);
    });
    return store;
  };
}
