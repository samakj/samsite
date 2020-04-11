class InvalidPathError(Exception):
    def __init__(self, message: str):
        super(InvalidPathError, self).__init__(message)
        self.message = message
