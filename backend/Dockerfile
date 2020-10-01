FROM python:3

ENV PYTHONUNBUFFERED 1

ENV DJANGO_SECRET_KEY 0rp--a)$nu$lr73gzd35i8pfrqngzsmg^y6j#c%_k=a1&wqw(#
ENV DEBUG 1
ENV DATABASE_NAME postgres
ENV DATABASE_USER postgres
ENV DATABASE_PASSWORD devpass123
ENV DATABASE_HOST db
ENV DATABASE_PORT 5432


RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt
COPY . /usr/src/app