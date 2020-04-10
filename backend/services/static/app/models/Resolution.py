class ResolutionValues:
    LOW = "LOW"
    MED = "MED"
    HIGH = "HIGH"
    RAW = "RAW"

    ALL = {LOW, MED, HIGH, RAW}


class ResolutionDimensions:
    LOW = {"height": 108, "width": 192}
    MED = {"height": 540, "width": 910}
    HIGH = {"height": 1080, "width": 1920}
