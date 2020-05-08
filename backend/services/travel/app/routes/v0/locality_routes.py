from flask import Blueprint, current_app, request
from samsite_flask.responses import JSONResponse

LOCALITIES_V0_BLUEPRINT = Blueprint(name="v0_localities", import_name=__name__)


@LOCALITIES_V0_BLUEPRINT.route("/localities/", methods=["POST"])
def create_locality() -> JSONResponse:
    request_data = request.get_json()
    return JSONResponse({
        "locality": current_app.locality_creation_handler.create_locality(
            name=request_data["name"],
            country_code=request_data["country_code"],
            latitude=request_data["latitude"],
            longitude=request_data["longitude"],
            gmaps_place_id=request_data.get("gmaps_place_id", None),
        )
    })


@LOCALITIES_V0_BLUEPRINT.route("/localities/<int:locality_id>/", methods=["GET"])
def get_locality(locality_id: int) -> JSONResponse:
    return JSONResponse({
        "locality": current_app.locality_store.get_locality(
            locality_id=locality_id,
            fields=set(request.args.getlist("fields")),
        )
    })


@LOCALITIES_V0_BLUEPRINT.route("/localities/", methods=["GET"])
def get_localities() -> JSONResponse:
    return JSONResponse({
        "localities": current_app.locality_store.get_localities(
            fields=set(request.args.getlist("fields")),
            locality_id=set(request.args.getlist("locality_id")),
            name=set(request.args.getlist("name")),
            country_code=set(request.args.getlist("country_code")),
            order_by=request.args.get("order_by", None),
            order_by_direction=request.args.get("order_by_direction", None),
        )
    })


@LOCALITIES_V0_BLUEPRINT.route("/localities/<int:locality_id>/", methods=["PATCH"])
def update_locality(locality_id: int) -> JSONResponse:
    request_data = request.get_json()
    return JSONResponse({
        "locality": current_app.locality_creation_handler.update_locality(
            locality_id=locality_id,
            name=request_data.get("name", None),
            country_code=request_data.get("country_code", None),
            latitude=request_data.get("latitude", None),
            longitude=request_data.get("longitude", None),
            gmaps_place_id=request_data.get("gmaps_place_id", None),
        )
    })


@LOCALITIES_V0_BLUEPRINT.route("/localities/<int:locality_id>/", methods=["DELETE"])
def delete_locality(locality_id: int) -> JSONResponse:
    return JSONResponse({
        "locality_id": current_app.locality_creation_handler.delete_locality(
            locality_id=locality_id,
        )
    })


@LOCALITIES_V0_BLUEPRINT.route("/localities/backup/", methods=["POST"])
def backup_localities() -> JSONResponse:
    return JSONResponse({"success": current_app.locality_store.backup_localities()})


@LOCALITIES_V0_BLUEPRINT.route("/localities/load/", methods=["POST"])
def load_localities() -> JSONResponse:
    return JSONResponse({"success": current_app.locality_store.load_localities_from_backup()})
