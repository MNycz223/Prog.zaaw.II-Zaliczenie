FROM python:3.14-trixie

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copy the rest of your application code into the container
COPY ./api /code/api
WORKDIR /code/api

# 6. Expose the port that FastAPI will run on
EXPOSE 8000

# 7. Command to run the application using 'fastapi run' (optimized for production)
CMD ["fastapi", "run", "main.py"]