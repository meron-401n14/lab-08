/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

// Client >> Server
require('./lib/server.js').start(process.env.PORT);
