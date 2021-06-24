const express = require('express');
var createError = require('http-errors');
const config = require('../server/config')[process.env.NODE_ENV || 'development'];

const adminRoutes = require('../server/routes/adminRoutes');
const productRoutes = require('../server/routes/productRoutes');


module.exports = (config) => {
    const app = express();

    //body-parser
    app.use(express.urlencoded({ extended:true}));
    app.use(express.json());

    //routes

    app.use('/api/admins', adminRoutes)
    app.use('/api/products', productRoutes)

     // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  // error handler

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500; // If no status is provided, let's assume it's a 500
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    console.log(err);
    res.json({ error: err.toString() });
  });

  return app;

}



// const express = require('express')
// var app = express();

// app.get('/', (req,res) => {
//     res.send('hello world')
// })

// const port = 3000;

// app.listen(port, () => console.log(`server listening on port ${port}`));  