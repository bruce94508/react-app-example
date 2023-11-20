FROM node:18.14-buster AS builder

WORKDIR /var/maxwin/react-app-template
COPY . .
COPY ./.env.example ./.env

# ARG SSH_KEY
# RUN if [ "$SSH_KEY" != "" ] ; then \
#   mkdir /root/.ssh \
#   && echo -n "$SSH_KEY" > /root/.ssh/id_rsa \
#   && chmod 600 /root/.ssh/id_rsa \
#   && touch /root/.ssh/known_hosts \
#   && ssh-keyscan -t rsa bitbucket.org > /root/.ssh/known_hosts \
#   else \
#    echo "no SSH_KEY found in env" \
#   fi
RUN yarn install --frozen-lockfile
RUN REACT_APP_WEB_UPDATED_AT=$(date +"%Y/%m/%d") \
  yarn run build && echo "Build End"

FROM node:18.14-alpine as publish
WORKDIR /root/
COPY --from=builder /var/maxwin/react-app-template/build ./build
COPY ./env.sh ./
COPY ./.env.example ./
RUN yarn global add serve@^14.2.0
EXPOSE 3000
ENTRYPOINT ["sh", "/root/env.sh"]
CMD [ "serve", "-s", "build", "-l", "3000"]
