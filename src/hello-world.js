var helloWorld = require('./hello-world.soy').helloWorld;
document.body.innerHTML = helloWorld({ name: 'John' });
