#!/bin/sh

: ${UID:=9999}
: ${GID:=9999}

echo "$UID:$GID"

userdel -f -r node 2>/dev/null
groupdel -f node 2>/dev/null
groupdel -f $GID 2>/dev/null
groupadd -g $GID node 2>/dev/null
useradd -g $GID -m -u $UID node 2>/dev/null

su-exec node:node "$@"
