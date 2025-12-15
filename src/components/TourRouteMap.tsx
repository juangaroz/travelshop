import { useEffect, useRef } from 'react';

interface RouteStop {
  name: string;
  lat: number;
  lng: number;
  type: 'start' | 'stop' | 'end';
}

interface TourRouteMapProps {
  stops: RouteStop[];
  tourName?: string;
}

// Nota: Este componente requiere la Google Maps JavaScript API
// En producción, deberás cargar el script de Google Maps con tu API key
declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

export function TourRouteMap({ stops, tourName = "Tour" }: TourRouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Función para inicializar el mapa
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      // Calcular el centro del mapa basado en todos los puntos
      const bounds = new window.google.maps.LatLngBounds();
      stops.forEach(stop => {
        bounds.extend(new window.google.maps.LatLng(stop.lat, stop.lng));
      });

      // Crear el mapa
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 6,
        center: stops[0] ? { lat: stops[0].lat, lng: stops[0].lng } : { lat: 19.4326, lng: -99.1332 },
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#a2daf2" }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Ajustar el mapa para mostrar todos los puntos
      map.fitBounds(bounds);

      // Crear las coordenadas del path
      const pathCoordinates = stops.map(stop => ({
        lat: stop.lat,
        lng: stop.lng
      }));

      // Dibujar la línea roja conectando todos los puntos
      const routePath = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#DC2626', // Rojo
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      routePath.setMap(map);

      // Crear marcadores para cada parada
      stops.forEach((stop, index) => {
        // Icono personalizado según el tipo
        let icon;
        
        if (stop.type === 'start') {
          // Pin rojo para inicio
          icon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#DC2626',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 10
          };
        } else if (stop.type === 'end') {
          // Pin rojo para fin
          icon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#DC2626',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 10
          };
        } else {
          // Marcadores azules con play para paradas intermedias
          icon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#4F46E5',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8
          };
        }

        const marker = new window.google.maps.Marker({
          position: { lat: stop.lat, lng: stop.lng },
          map: map,
          title: stop.name,
          icon: icon
        });

        // InfoWindow para mostrar el nombre de la ciudad
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px; font-family: system-ui, sans-serif;">
            <strong style="font-size: 14px; color: #1f2937;">${stop.name}</strong>
            <br/>
            <span style="font-size: 12px; color: #6b7280;">
              ${stop.type === 'start' ? 'Inicio del tour' : 
                stop.type === 'end' ? 'Fin del tour' : 
                `Parada ${index}`}
            </span>
          </div>`
        });

        // Mostrar info al hacer clic
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };

    // Cargar el script de Google Maps si no está cargado
    if (!window.google) {
      const script = document.createElement('script');
      // NOTA: En producción, reemplaza YOUR_API_KEY con tu API key real de Google Maps
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [stops]);

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Nota:</strong> Este mapa es una demostración. En producción, necesitarás configurar una API key de Google Maps.
        </p>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-[500px] rounded-xl border border-neutral-200"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}

// Componente alternativo: Mapa estático simulado con imagen de ejemplo
export function TourRouteMapStatic({ stops, tourName = "Tour" }: TourRouteMapProps) {
  return (
    <div className="space-y-4">
      {/* Mapa simulado con Google Maps estilo */}
      <div className="relative w-full h-[500px] rounded-xl border border-neutral-200 overflow-hidden bg-neutral-100">
        {/* Fondo de mapa simulado */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-emerald-50 to-lime-100 opacity-40"></div>
        
        {/* Grid para simular mapa */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Watermark Google estilo */}
        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded shadow-sm">
          <span className="text-xs text-neutral-600 font-medium">Google Maps</span>
        </div>

        {/* Controles de zoom simulados */}
        <div className="absolute bottom-24 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <button className="w-10 h-10 flex items-center justify-center border-b border-neutral-200 hover:bg-neutral-50">
            <span className="text-xl text-neutral-600">+</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50">
            <span className="text-xl text-neutral-600">−</span>
          </button>
        </div>

        {/* Fullscreen button */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 hover:bg-neutral-50 cursor-pointer">
          <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>

        {/* SVG para dibujar la ruta */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          {/* Línea roja conectando los puntos */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill="#DC2626" />
            </marker>
          </defs>
          
          {stops.map((stop, index) => {
            if (index === stops.length - 1) return null;
            
            const nextStop = stops[index + 1];
            // Convertir coordenadas reales a posición en pantalla (simulado)
            const x1 = 100 + index * 150;
            const y1 = 250 + Math.sin(index) * 80;
            const x2 = 100 + (index + 1) * 150;
            const y2 = 250 + Math.sin(index + 1) * 80;
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#DC2626"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>

        {/* Marcadores de ciudades */}
        <div className="absolute inset-0" style={{ zIndex: 20 }}>
          {stops.map((stop, index) => {
            // Posición simulada para demo
            const x = 100 + index * 150;
            const y = 250 + Math.sin(index) * 80;
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pin/Marker */}
                <div className="relative group cursor-pointer">
                  {stop.type === 'start' || stop.type === 'end' ? (
                    // Pin rojo para inicio/fin
                    <div className="w-10 h-10 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    // Marcador azul con play para paradas
                    <div className="w-9 h-9 bg-indigo-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  )}

                  {/* Tooltip con nombre de ciudad */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-neutral-200">
                      <p className="text-sm text-neutral-900">{stop.name}</p>
                      <p className="text-xs text-neutral-500">
                        {stop.type === 'start' ? 'Inicio' : stop.type === 'end' ? 'Fin' : `Parada ${index}`}
                      </p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-white border-r border-b border-neutral-200 transform rotate-45"></div>
                  </div>
                </div>

                {/* Label de ciudad */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                  <p className="text-xs text-neutral-700">{stop.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-6 text-sm text-neutral-600 bg-neutral-50 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-sm"></div>
          <span>Inicio/Fin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></div>
          <span>Paradas del tour</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-600"></div>
          <span>Ruta del circuito</span>
        </div>
      </div>
    </div>
  );
}
