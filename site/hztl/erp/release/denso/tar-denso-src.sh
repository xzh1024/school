#!/bin/bash
# 电装源码打包
set -ex
cd $(dirname $0)/../..

rm -f frontend.tar

tar -cf frontend.tar \
    --exclude=.git --exclude=release --exclude=src/config \
    -X erp/.gitignore -X crm/.gitignore -X erp-h5/.gitignore \
    erp crm erp-h5

tar -rf frontend.tar \
    --exclude=release/img-web/public \
    -X erp/.gitignore -X crm/.gitignore -X erp-h5/.gitignore \
    erp/release/img-web       erp/src/config/denso.qa.js \
    crm/release/img-web       crm/src/config/denso.qa.js \
    erp-h5/release/img-web erp-h5/src/config/denso.qa.js

gzip frontend.tar
