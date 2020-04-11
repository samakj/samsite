class InvalidResolution(Exception):
    def __init__(self, message: str):
        super(InvalidResolution, self).__init__(message)
        self.message = message
