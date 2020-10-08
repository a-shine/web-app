FROM python:3.7.4

ENV DJANGO_SECRET_KEY p-e=(d235#j+*9g!bvl^bxh08*rfl1u=vs9r5w@2z05n9jfuoh
ENV DJANGO_ALLOWED_HOSTS 127.0.0.1,localhost

WORKDIR /usr/src/app

COPY ./backend/requirements.txt /usr/src/app/
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

COPY ./backend /usr/src/app/

COPY ./prod/containers/backend-python-server/entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["gunicorn", "-b", "0.0.0.0", "-w", "1", "backend.wsgi"]