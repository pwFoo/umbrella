// [INTERNAL USE ONLY]
// Generate a fragment of HTML. This irons out the inconsistences
u.prototype.generate = function (html) {
  // Table elements need to be child of <table> for some f***ed up reason
  if (/^\s*<t(h|r|d)/.test(html)) {
    var table = document.createElement('table');
    return u(table).html(html).children().children().nodes;
  } else if (/^\s*</.test(html)) {
    return u(document.createElement('div')).html(html).children().nodes;
  } else {
    return document.createTextNode(html);
  }
};
