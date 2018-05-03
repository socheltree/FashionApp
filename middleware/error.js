const errorConfig = require(`../configs/errors.json`);

function getConfigError(errorName) {
  let err = {};
  const configError = errorConfig[errorName];

  if ( configError ) {
    err = Object.assign(err, configError);
  } else {
    err = undefined;
  }
  return err;
}


function errorHandler(err, req, res, next) {

  try {
    // Custom error handling here
    const configError = getConfigError(err.message);
    if ( configError ) {

      res.status(configError.statusCode);
      // Allow custom message to be set
      if ( err.clientMessage ) {
        configError.details = err.clientMessage;
      }

      const obj = {};
      const props = Object.getOwnPropertyNames(err);
      for (let i = 0; i < props.length; i++) {
        if (props[i] !== 'name') {
          obj[props[i]] = err[props[i]];
        }
      }

      configError.debug = obj;
      res.json(configError);

    } else { // Default 500 error if error not defined in error-config
      res.status(500).send('Internal Server Error');
    }
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }

  return res;
}

module.exports = {
  errorHandler
}
