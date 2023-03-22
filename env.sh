#!/bin/bash
# Program:
#	  used as docker image ENTRYPOINT, injecting runtime env through env.config.js, loaded by html script tag

set -e

# Recreate config file
rm -rf /root/build/env.config.js
touch /root/build/env.config.js

if [ ! -f /root/.env ]; then
  cp /root/.env.example /root/.env
fi

# Add assignment
echo "window._env_ = {" >> /root/build/env.config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`, excluding comment lines begining with # , no name, blank line
  if printf '%s\n' "$line" | grep '^[[:blank:]]*[^[:blank:]#]' | grep -q -e '.=' ; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//'); else
    continue
  fi

  # Read value (substr after first "=") of current variable if exists as Environment variable
  value=$(printenv | grep -w $varname | sed -e 's/^[^=]*=//')
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> /root/build/env.config.js
  # replace __PUBLIC_URL_PLACEHOLDER__ in html file
  [[ "${varname}" == "PUBLIC_URL" ]] && sed -i -e "s:__PUBLIC_URL_PLACEHOLDER__:$value:g" /root/build/index.html

done </root/.env

echo "}" >> /root/build/env.config.js

exec "$@"