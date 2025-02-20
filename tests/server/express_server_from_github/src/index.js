import express from '../../express_model/express';

import models from './models';
import routes from './routes';
var client = require('./../express_test_client')()

const app = express.createApplication();

// * Application-Level Middleware * //

// Third-Party Middleware


// Built-In Middleware


// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
// * Start * //

app.use((req,res,next) => {
  console.log(res)
  next()
})

const res = app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
client.generateRequest(),
);
