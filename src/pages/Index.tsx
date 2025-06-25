
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Phone, 
  Users, 
  AlertTriangle, 
  Activity,
  Clock,
  Database,
  Globe,
  Play,
  Pause
} from 'lucide-react';
import LiveFeed from '@/components/LiveFeed';
import AccidentMap from '@/components/AccidentMap';
import DataEnrichment from '@/components/DataEnrichment';
import SocialMediaMapping from '@/components/SocialMediaMapping';
import Analytics from '@/components/Analytics';

const Index = () => {
  const [isLive, setIsLive] = useState(true);
  const [totalAccidents, setTotalAccidents] = useState(247);
  const [enrichedLeads, setEnrichedLeads] = useState(189);
  const [socialMediaFound, setSocialMediaFound] = useState(156);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setTotalAccidents(prev => prev + Math.floor(Math.random() * 3));
        setEnrichedLeads(prev => prev + Math.floor(Math.random() * 2));
        setSocialMediaFound(prev => prev + Math.floor(Math.random() * 2));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  CrashWhisperer
                </h1>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <Activity className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={isLive ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className="flex items-center space-x-2"
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isLive ? 'Pause' : 'Resume'} Feed</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                Total Accidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{totalAccidents}</div>
              <p className="text-xs text-slate-400 mt-1">+{Math.floor(Math.random() * 5) + 1} in last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Database className="h-4 w-4 mr-2 text-blue-400" />
                Enriched Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{enrichedLeads}</div>
              <p className="text-xs text-slate-400 mt-1">76% enrichment rate</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Globe className="h-4 w-4 mr-2 text-green-400" />
                Social Media Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{socialMediaFound}</div>
              <p className="text-xs text-slate-400 mt-1">83% match rate</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                Avg Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">2.3s</div>
              <p className="text-xs text-slate-400 mt-1">Detection to enrichment</p>
            </CardContent>
          </Card>
        </div>

        {/* Legal Disclaimer */}
        <Alert className="mb-6 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-200">
            <strong>POC Demo:</strong> This is a proof-of-concept using simulated data. 
            Real implementation would require strict compliance with privacy laws, GDPR, CCPA, and ethical data collection practices.
          </AlertDescription>
        </Alert>

        {/* Main Dashboard */}
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="feed">Live Feed</TabsTrigger>
            <TabsTrigger value="map">Accident Map</TabsTrigger>
            <TabsTrigger value="enrichment">Data Enrichment</TabsTrigger>
            <TabsTrigger value="social">Social Mapping</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <LiveFeed isLive={isLive} />
          </TabsContent>

          <TabsContent value="map">
            <AccidentMap />
          </TabsContent>

          <TabsContent value="enrichment">
            <DataEnrichment />
          </TabsContent>

          <TabsContent value="social">
            <SocialMediaMapping />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
