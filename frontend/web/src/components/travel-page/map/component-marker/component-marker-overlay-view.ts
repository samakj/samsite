import { RefObject } from 'react';

export const createComponentMarkerOverlayView = (
    ref: RefObject<HTMLElement>,
    latLng: google.maps.LatLng,
    map: google.maps.Map,
    OverlayView = google.maps.OverlayView,
) => {
    class ComponentMarkerOverlayView extends OverlayView {
        ref: RefObject<HTMLElement>;
        latLng: google.maps.LatLng;
        markerInitiated: boolean;
        isDraggable: boolean;

        constructor (ref: RefObject<HTMLElement>, latLng: google.maps.LatLng, map: google.maps.Map) {
            super();
            this.ref = ref;
            this.latLng = latLng;
            this.markerInitiated = false;
            this.isDraggable = false;
            this.setMap(map);
        }

        addElementClickListener (): void {
            google.maps.event.addDomListener(
                this.ref.current,
                'click',
                (): void => {
                    google.maps.event.trigger(this, 'click');
                },
            );
        }

        addElementToPanes (): void {
            const panes = this.getPanes();
            panes.overlayLayer.appendChild(this.ref.current);
            panes.overlayMouseTarget.appendChild(this.ref.current);
            this.markerInitiated = true;
        }

        updateElementPosition (projection: google.maps.MapCanvasProjection): void {
            const position = projection.fromLatLngToDivPixel(this.latLng);
            this.ref.current.style.left = `${position.x}px`;
            this.ref.current.style.top = `${position.y}px`;
        }

        draw (): void {
            if (this.ref && this.ref.current) {
                if (!this.markerInitiated) {
                    this.addElementClickListener();
                    this.addElementToPanes();
                }

                const projection = this.getProjection();
                if (projection) this.updateElementPosition(projection);
            }
        }

        getPosition() {
            return this.latLng;
        }

        getDraggable() {
            return this.isDraggable;
        }
    }

    return new ComponentMarkerOverlayView(ref, latLng, map);
};
