FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html
COPY admin /usr/share/nginx/html/admin
COPY logistics /usr/share/nginx/html/logistics

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
