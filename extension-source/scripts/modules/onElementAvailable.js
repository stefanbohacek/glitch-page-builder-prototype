// https://www.basedash.com/blog/waiting-for-an-element-to-exist-with-javascript

const onElementAvailable = (selector, callback) => {
  const observer = new MutationObserver(mutations => {
    if (document.querySelector(selector)) {
      observer.disconnect();
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}