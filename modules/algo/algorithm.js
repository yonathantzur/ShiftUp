let { PythonShell } = require('python-shell');

module.exports = {
    // Run algorithm with array of arguments strings.
    Run(args) {
        PythonShell.run('script.py',
            { args },
            (err, results) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(results);
                }
            });
    }
}