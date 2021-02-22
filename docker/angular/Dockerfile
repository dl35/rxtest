FROM node:13-alpine as node-angular-cli

RUN apk --no-cache add shadow su-exec git

RUN set -xe
RUN mkdir /app
RUN chgrp node /app
RUN chown node /app


RUN set -xe;\
    npm uninstall -g @angular/cli;\
    npm cache verify;\
    npm install -g @angular/cli@latest;\
    npm cache clean --force;



ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]



WORKDIR /app
EXPOSE 4200


CMD ["/bin/sh", "-l"]



