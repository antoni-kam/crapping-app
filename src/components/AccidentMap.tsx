
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, Users, Clock } from 'lucide-react';

interface MapAccident {
  id: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  leadCount: number;
}

const AccidentMap: React.FC = () => {
  const [accidents, setAccidents] = useState<MapAccident[]>([]);
  const [selectedAccident, setSelectedAccident] = useState<MapAccident | null>(null);

  useEffect(() => {
    // Generate mock accident data
    const mockAccidents: MapAccident[] = [
      {
        id: '1',
        lat: 34.0522,
        lng: -118.2437,
        city: 'Los Angeles',
        state: 'CA',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        severity: 'high',
        leadCount: 3
      },
      {
        id: '2',
        lat: 40.7128,
        lng: -74.0060,
        city: 'New York',
        state: 'NY',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        severity: 'medium',
        leadCount: 2
      },
      {
        id: '3',
        lat: 41.8781,
        lng: -87.6298,
        city: 'Chicago',
        state: 'IL',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        severity: 'low',
        leadCount: 1
      },
      {
        id: '4',
        lat: 29.7604,
        lng: -95.3698,
        city: 'Houston',
        state: 'TX',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        severity: 'high',
        leadCount: 4
      },
      {
        id: '5',
        lat: 33.4484,
        lng: -112.0740,
        city: 'Phoenix',
        state: 'AZ',
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        severity: 'medium',
        leadCount: 2
      }
    ];
    
    setAccidents(mockAccidents);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Visualization */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-400" />
              <span>Real-Time Accident Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mock Map Container */}
            <div className="relative h-96 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
              {/* Background "map" */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
              
              {/* Mock accident markers */}
              {accidents.map((accident) => (
                <div
                  key={accident.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                  style={{
                    left: `${20 + (Math.abs(accident.lng) % 60)}%`,
                    top: `${20 + (Math.abs(accident.lat) % 60)}%`
                  }}
                  onClick={() => setSelectedAccident(accident)}
                >
                  <div className={`w-4 h-4 rounded-full ${getSeverityColor(accident.severity)} pulse-animation shadow-lg`}>
                    <div className={`absolute inset-0 rounded-full ${getSeverityColor(accident.severity)} animate-ping opacity-75`}></div>
                  </div>
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs whitespace-nowrap">
                    {accident.city}
                  </div>
                </div>
              ))}
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-3">
                <div className="text-xs font-medium text-white mb-2">Severity</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-slate-300">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-slate-300">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-300">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accident Details */}
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Recent Accidents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accidents.slice(0, 3).map((accident) => (
                <div
                  key={accident.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAccident?.id === accident.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedAccident(accident)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-white">{accident.city}, {accident.state}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(accident.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge className={getSeverityBadgeColor(accident.severity)}>
                      {accident.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-blue-400" />
                      <span className="text-slate-300">{accident.leadCount} leads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Accident Details */}
        {selectedAccident && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">Accident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Location</h4>
                <p className="text-slate-300">{selectedAccident.city}, {selectedAccident.state}</p>
                <p className="text-sm text-slate-400">
                  {selectedAccident.lat.toFixed(4)}, {selectedAccident.lng.toFixed(4)}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Timeline</h4>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">
                    {new Date(selectedAccident.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Lead Generation</h4>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-300">{selectedAccident.leadCount} leads identified</span>
                </div>
                <Badge className={getSeverityBadgeColor(selectedAccident.severity)} variant="secondary">
                  {selectedAccident.severity.toUpperCase()} Priority
                </Badge>
              </div>

              <Button className="w-full">
                View Full Lead Report
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AccidentMap;
