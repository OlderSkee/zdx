// a phantomjs example, saved as img
var page = require('webpage').create();
page.open("http://www.cnblogs.com/front-Thinking/", function(status) {
    if ( status === "success" ) {
        console.log(page.title);
        page.render("front-Thinking.png");
    } else {
        console.log("Page failed to load.");
    }
    phantom.exit(0);
});