
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Clock, Phone, User, ExternalLink } from 'lucide-react';

interface AccidentLead {
  id: string;
  timestamp: string;
  location: {
    city: string;
    state: string;
    zip: string;
    crossStreets: string;
    lat: number;
    lng: number;
  };
  person: {
    firstName: string;
    lastName: string;
    phone: string;
    confidence: number;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    snapchat?: string;
  };
  source: string;
  status: 'processing' | 'enriched' | 'complete';
}

const LiveFeed: React.FC<{ isLive: boolean }> = ({ isLive }) => {
  const [accidents, setAccidents] = useState<AccidentLead[]>([]);

  const generateMockAccident = (): AccidentLead => {
    const cities = [
      { city: 'Los Angeles', state: 'CA', zip: '90210' },
      { city: 'New York', state: 'NY', zip: '10001' },
      { city: 'Chicago', state: 'IL', zip: '60601' },
      { city: 'Houston', state: 'TX', zip: '77001' },
      { city: 'Phoenix', state: 'AZ', zip: '85001' },
      { city: 'Miami', state: 'FL', zip: '33101' }
    ];
    
    const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'Robert', 'Ashley'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const sources = ['TomTom API', 'Municipal Feed', 'EMS Scanner', 'Waze Feed', '911 API', 'CAD System'];
    
    const location = cities[Math.floor(Math.random() * cities.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      location: {
        ...location,
        crossStreets: `${Math.floor(Math.random() * 99) + 1}th St & Main Ave`,
        lat: 34.0522 + (Math.random() - 0.5) * 0.1,
        lng: -118.2437 + (Math.random() - 0.5) * 0.1
      },
      person: {
        firstName,
        lastName,
        phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        confidence: Math.floor(Math.random() * 30) + 70
      },
      socialMedia: {
        facebook: Math.random() > 0.3 ? `fb.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : undefined,
        twitter: Math.random() > 0.5 ? `@${firstName.toLowerCase()}${Math.floor(Math.random() * 99)}` : undefined,
        instagram: Math.random() > 0.4 ? `@${firstName.toLowerCase()}_${lastName.toLowerCase()}` : undefined,
        snapchat: Math.random() > 0.6 ? `${firstName.toLowerCase()}${Math.floor(Math.random() * 999)}` : undefined
      },
      source: sources[Math.floor(Math.random() * sources.length)],
      status: Math.random() > 0.7 ? 'complete' : Math.random() > 0.4 ? 'enriched' : 'processing'
    };
  };

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 5 }, generateMockAccident);
    setAccidents(initialData);
  }, []);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newAccident = generateMockAccident();
      setAccidents(prev => [newAccident, ...prev.slice(0, 19)]); // Keep only latest 20
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'enriched': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSocialMediaCount = (socialMedia: AccidentLead['socialMedia']) => {
    return Object.values(socialMedia).filter(Boolean).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Real-Time Accident Feed</h2>
        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
          {accidents.length} Active Leads
        </Badge>
      </div>

      <ScrollArea className="h-[600px] w-full">
        <div className="space-y-4">
          {accidents.map((accident) => (
            <Card key={accident.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      {new Date(accident.timestamp).toLocaleTimeString()}
                    </span>
                    <Badge className={getStatusColor(accident.status)}>
                      {accident.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {accident.source}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">
                      {accident.location.crossStreets}
                    </p>
                    <p className="text-sm text-slate-400">
                      {accident.location.city}, {accident.location.state} {accident.location.zip}
                    </p>
                  </div>
                </div>

                {/* Person Info */}
                <div className="flex items-start space-x-3">
                  <User className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-medium">
                        {accident.person.firstName} {accident.person.lastName}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {accident.person.confidence}% match
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="h-3 w-3 text-slate-400" />
                      <span className="text-sm text-slate-400">{accident.person.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                {getSocialMediaCount(accident.socialMedia) > 0 && (
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="h-4 w-4 text-green-400" />
                    <div className="flex flex-wrap gap-2">
                      {accident.socialMedia.facebook && (
                        <Badge variant="outline" className="text-xs text-blue-400 border-blue-400/30">
                          Facebook
                        </Badge>
                      )}
                      {accident.socialMedia.twitter && (
                        <Badge variant="outline" className="text-xs text-sky-400 border-sky-400/30">
                          Twitter
                        </Badge>
                      )}
                      {accident.socialMedia.instagram && (
                        <Badge variant="outline" className="text-xs text-pink-400 border-pink-400/30">
                          Instagram
                        </Badge>
                      )}
                      {accident.socialMedia.snapchat && (
                        <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400/30">
                          Snapchat
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LiveFeed;
