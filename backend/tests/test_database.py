from api.database import engine

def test_database_connection():
    connection = engine.connect()

    assert connection.closed is False
    connection.close()