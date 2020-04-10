class InvalidPath(Exception):
    def __init__(self, message: str):
        super(InvalidPath, self).__init__(message)
        self.message = message
