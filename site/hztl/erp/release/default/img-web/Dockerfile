FROM registry.cn-beijing.aliyuncs.com/lovego/service

LABEL builder=xiaomei

COPY server.conf /etc/nginx/sites-available/erp.conf.tmpl
COPY public /var/www/erp/

WORKDIR /var/log/nginx/erp
USER root
RUN  chown ubuntu:ubuntu .

CMD [ "nginx-start" ]
