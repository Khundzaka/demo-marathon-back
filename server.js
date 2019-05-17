const app = require('./app');

const port = process.env.PORT || 3333;

app.listen(port, function () {
    console.log('server started');
}).on('error', function (err) {
    console.log('error happened');
    console.log(err.message)
});
