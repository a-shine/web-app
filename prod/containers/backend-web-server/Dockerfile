# Static Assets
FROM python:3.7.4 AS build

WORKDIR /usr/src/app

ENV DJANGO_SECRET_KEY p-e=(d235#j+*9g!bvl^bxh08*rfl1u=vs9r5w@2z05n9jfuoh

# Install Python dependencies
COPY ./backend/requirements.txt /usr/src/app/
RUN pip3 install -r requirements.txt

# Copy Python files
COPY ./backend /usr/src/app/

# Build static assets
RUN python3 manage.py collectstatic --noinput


# NGINX
FROM nginx:1.19-alpine

# Configure NGINX
COPY ./prod/containers/backend-web-server/default-djan.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY --from=build /usr/src/app/static/ /var/www/html/static
RUN chown -R nginx:nginx /var/www/html
RUN chmod -R 755 /var/www/html

CMD ["nginx", "-g", "daemon off;"]