
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Clock, 
  Target,
  AlertTriangle,
  Database,
  Zap
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data for various charts
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    accidents: Math.floor(Math.random() * 20) + 5,
    leads: Math.floor(Math.random() * 15) + 3,
    enriched: Math.floor(Math.random() * 12) + 2
  }));

  const platformData = [
    { platform: 'Facebook', profiles: 145, color: '#3b82f6' },
    { platform: 'Instagram', profiles: 128, color: '#ec4899' },
    { platform: 'Twitter', profiles: 96, color: '#06b6d4' },
    { platform: 'LinkedIn', profiles: 72, color: '#1d4ed8' },
    { platform: 'TikTok', profiles: 58, color: '#000000' },
    { platform: 'Snapchat', profiles: 43, color: '#eab308' }
  ];

  const stateData = [
    { state: 'CA', accidents: 45, leads: 38, rate: 84 },
    { state: 'TX', accidents: 38, leads: 29, rate: 76 },
    { state: 'NY', accidents: 32, leads: 27, rate: 84 },
    { state: 'FL', accidents: 28, leads: 22, rate: 79 },
    { state: 'IL', accidents: 24, leads: 19, rate: 79 },
    { state: 'PA', accidents: 19, leads: 15, rate: 79 }
  ];

  const enrichmentData = [
    { source: 'Clearbit', success: 156, failed: 23, rate: 87 },
    { source: 'People Data Labs', success: 142, failed: 31, rate: 82 },
    { source: 'FullContact', success: 134, failed: 28, rate: 83 },
    { source: 'Public Records', success: 98, failed: 45, rate: 69 }
  ];

  const performanceMetrics = {
    totalAccidents: 247,
    totalLeads: 189,
    conversionRate: 76.5,
    avgProcessingTime: 2.3,
    socialMediaFound: 156,
    socialMediaRate: 82.5,
    dailyGrowth: 12.3,
    systemUptime: 99.8
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-400">{performanceMetrics.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-slate-400">+2.3% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Processing</p>
                <p className="text-2xl font-bold text-blue-400">{performanceMetrics.avgProcessingTime}s</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-slate-400">-0.4s improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Social Media Rate</p>
                <p className="text-2xl font-bold text-purple-400">{performanceMetrics.socialMediaRate}%</p>
              </div>
              <Globe className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-slate-400">+1.8% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">System Uptime</p>
                <p className="text-2xl font-bold text-green-400">{performanceMetrics.systemUptime}%</p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <span>Hourly Activity (24h)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="accidents" 
                      stackId="1"
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.3}
                      name="Accidents"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="leads" 
                      stackId="2"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      name="Leads"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="enriched" 
                      stackId="3"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                      name="Enriched"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Processing Pipeline */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-green-400" />
                  <span>Processing Pipeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-white">Accident Detection</span>
                    </div>
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                      247 processed
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span className="text-white">Lead Identification</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      189 identified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-green-400" />
                      <span className="text-white">Data Enrichment</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      189 enriched
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-purple-400" />
                      <span className="text-white">Social Media Mapping</span>
                    </div>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                      156 mapped
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* State Performance */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span>Performance by State</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="state" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="accidents" fill="#ef4444" name="Accidents" />
                    <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Conversion Rates */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>State Conversion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateData.map((state) => (
                    <div key={state.state} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{state.state}</span>
                        <span className="text-slate-400">{state.rate}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${state.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Distribution */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span>Social Media Platform Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="profiles"
                      nameKey="platform"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platformData.map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: platform.color }}
                        />
                        <span className="text-white">{platform.platform}</span>
                      </div>
                      <Badge variant="secondary" className="bg-slate-600">
                        {platform.profiles} profiles
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Source Performance */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-green-400" />
                  <span>Data Source Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={enrichmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="source" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="success" fill="#10b981" name="Success" />
                    <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Source Details */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Enrichment Source Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrichmentData.map((source) => (
                    <div key={source.source} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{source.source}</span>
                        <Badge variant="secondary" className={
                          source.rate >= 85 ? 'bg-green-500/20 text-green-400' :
                          source.rate >= 75 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {source.rate}% success rate
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>{source.success} successful</span>
                        <span>{source.failed} failed</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            source.rate >= 85 ? 'bg-green-500' :
                            source.rate >= 75 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${source.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
