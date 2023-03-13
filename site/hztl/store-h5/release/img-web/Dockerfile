FROM registry.cn-beijing.aliyuncs.com/lovego/service

LABEL builder=xiaomei

COPY server.conf /etc/nginx/sites-available/server.conf.tmpl
COPY public /var/www/store-h5/

WORKDIR /var/log/nginx/store-h5
USER root
RUN  chown ubuntu:ubuntu .

CMD ["nginx-start"]
