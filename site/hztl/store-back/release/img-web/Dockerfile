FROM registry.cn-beijing.aliyuncs.com/lovego/service

LABEL builder=xiaomei

COPY server.conf /etc/nginx/sites-available/server.conf.tmpl
COPY public /var/www/store-back/

WORKDIR /var/log/nginx/store-back
USER root
RUN  chown ubuntu:ubuntu .

CMD ["nginx-start"]
