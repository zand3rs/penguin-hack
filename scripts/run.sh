#!/bin/bash

mongo penguin OwnerRole.js
mongo penguin users.js
mongo penguin apps.js
mongo penguin roles.js
mongo penguin app_users.js
mongo penguin models.js

exit 0;
