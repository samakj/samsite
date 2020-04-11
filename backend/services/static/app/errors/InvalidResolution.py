class InvalidResolutionError(Exception):
    def __init__(self, message: str):
        super(InvalidResolutionError, self).__init__(message)
        self.message = message
