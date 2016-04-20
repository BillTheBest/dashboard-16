# dashboard
A configurable dashboard implemented using web technologies. The dashboard is configured via JSON.
The data to display is also loaded from JSON. This JSON is loaded from separate JavaScript files
(via script elements), so the JSON data can be loaded either from the disk or a URL.

The dashboard consists of a set of templates (HTML, CSS etc.), some JavaScript code files, and then
the JSON files containing configuration and data.

To configure the dashboard for your own use (and to display the data you want to display), edit
the JSON files.

You can also edit the template files in case you want the design (looks) of the dashboard to be different,
or need another graphical widget, function etc.

So far the dashboard only uses HTML5, CSS 3 and JavaScript. I have deliberately not used any external
frameworks like jQuery, AngularJS etc. I wanted to keep the code as close to the plain web tech's as
possible, to enable as many developers as possible to be able to understand and modify the code
for their needs.


