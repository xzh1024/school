#!/bin/bash
# 邦邦源码强制推送（作为首次提交，不包含提交历史）

set -ex
shopt -s extglob
cd $(dirname $0)/../..

main() {
    local tagName=bb-first-commit.$(date +'%Y-%m-%d')
    local projectDir=$(pwd)

    cd $projectDir
    git branch -D $tagName || true
    git checkout -b $tagName bb.production
    clearCode
    git add release/bb/
    git commit -am '清理邦邦不需要的代码'
    pushToBB

    cd $projectDir
    git tag -f $tagName
    git push -f --tags
}

clearCode() {
    sed --version |& fgrep -q GNU && suffix= || suffix="''" # 管道的优先级比逻辑操作符高
    sed -i $suffix -E '\@/release/(default|denso)/@ d' .gitlab-ci.yml
    rm -f release/bb/img-web
    mv release/default/img-web release/bb/
    rm -rf src/config/!(bb.*).js release/!(bb) release/bb/push-to-bb-front.sh \
        src/router/repair src/views/repair src/components/repair
}

pushToBB() {
    rm -rf /tmp/bb/frontend/erp
    git checkout-index -a --prefix=/tmp/bb/frontend/erp/
    cd /tmp/bb/frontend/erp
    git init
    git add .
    git commit -am 'first commit'
    git remote add origin git@gitlab.threesoft.cn:bb-front/erp.git
    git push -fu origin master:bb.production
}

main

