FROM hub.c.163.com/lovego/xiaomei/nginx

LABEL builder=xiaomei

WORKDIR /var/log/nginx/repair
RUN  chown ubuntu:ubuntu .

COPY web.conf.tmpl /etc/nginx/sites-available/www.conf.tmpl
COPY public /var/www/repair/

