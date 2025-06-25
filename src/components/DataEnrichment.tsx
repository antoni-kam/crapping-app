
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Check, 
  X, 
  Clock,
  RefreshCw
} from 'lucide-react';

interface EnrichmentProcess {
  id: string;
  name: string;
  phone: string;
  stage: 'identity' | 'contact' | 'location' | 'demographics' | 'complete';
  progress: number;
  data: {
    identity?: {
      fullName: string;
      age: number;
      confidence: number;
    };
    contact?: {
      email: string;
      phone: string;
      alternatePhone?: string;
    };
    location?: {
      address: string;
      city: string;
      state: string;
      zip: string;
    };
    demographics?: {
      occupation: string;
      income: string;
      education: string;
    };
  };
  sources: string[];
  status: 'processing' | 'complete' | 'failed';
}

const DataEnrichment: React.FC = () => {
  const [processes, setProcesses] = useState<EnrichmentProcess[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<EnrichmentProcess | null>(null);

  const generateMockProcess = (): EnrichmentProcess => {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Davis'];
    const name = names[Math.floor(Math.random() * names.length)];
    const stages = ['identity', 'contact', 'location', 'demographics', 'complete'] as const;
    const currentStageIndex = Math.floor(Math.random() * stages.length);
    const currentStage = stages[currentStageIndex];
    
    return {
      id: `enrich_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      stage: currentStage,
      progress: (currentStageIndex + 1) * 20,
      data: {
        identity: currentStageIndex >= 0 ? {
          fullName: name,
          age: Math.floor(Math.random() * 40) + 25,
          confidence: Math.floor(Math.random() * 20) + 80
        } : undefined,
        contact: currentStageIndex >= 1 ? {
          email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
          phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          alternatePhone: Math.random() > 0.5 ? `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined
        } : undefined,
        location: currentStageIndex >= 2 ? {
          address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
          city: ['Los Angeles', 'New York', 'Chicago', 'Houston'][Math.floor(Math.random() * 4)],
          state: ['CA', 'NY', 'IL', 'TX'][Math.floor(Math.random() * 4)],
          zip: `${Math.floor(Math.random() * 90000) + 10000}`
        } : undefined,
        demographics: currentStageIndex >= 3 ? {
          occupation: ['Software Engineer', 'Teacher', 'Manager', 'Consultant'][Math.floor(Math.random() * 4)],
          income: ['$50k-75k', '$75k-100k', '$100k-150k', '$150k+'][Math.floor(Math.random() * 4)],
          education: ['High School', 'Bachelors', 'Masters', 'PhD'][Math.floor(Math.random() * 4)]
        } : undefined
      },
      sources: ['Clearbit', 'People Data Labs', 'FullContact', 'Public Records'].slice(0, Math.floor(Math.random() * 3) + 1),
      status: currentStage === 'complete' ? 'complete' : Math.random() > 0.9 ? 'failed' : 'processing'
    };
  };

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 3 }, generateMockProcess);
    setProcesses(initialData);
    setSelectedProcess(initialData[0]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new processes occasionally
      if (Math.random() > 0.7) {
        const newProcess = generateMockProcess();
        setProcesses(prev => [newProcess, ...prev.slice(0, 9)]);
      }
      
      // Update existing processes
      setProcesses(prev => prev.map(process => {
        if (process.status === 'processing' && Math.random() > 0.8) {
          const stages = ['identity', 'contact', 'location', 'demographics', 'complete'] as const;
          const currentIndex = stages.indexOf(process.stage);
          if (currentIndex < stages.length - 1) {
            const nextStage = stages[currentIndex + 1];
            return {
              ...process,
              stage: nextStage,
              progress: (currentIndex + 2) * 20,
              status: nextStage === 'complete' ? 'complete' : 'processing'
            };
          }
        }
        return process;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStageIcon = (stage: string, isActive: boolean, isComplete: boolean) => {
    const iconClass = isComplete ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-slate-500';
    
    switch (stage) {
      case 'identity': return <User className={`h-4 w-4 ${iconClass}`} />;
      case 'contact': return <Phone className={`h-4 w-4 ${iconClass}`} />;
      case 'location': return <MapPin className={`h-4 w-4 ${iconClass}`} />;
      case 'demographics': return <Building className={`h-4 w-4 ${iconClass}`} />;
      case 'complete': return <Check className={`h-4 w-4 ${iconClass}`} />;
      default: return <Database className={`h-4 w-4 ${iconClass}`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Process List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Active Enrichment Processes</h2>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {processes.filter(p => p.status === 'processing').length} Processing
          </Badge>
        </div>

        <div className="space-y-3">
          {processes.map((process) => (
            <Card 
              key={process.id} 
              className={`bg-slate-800/50 border-slate-700 cursor-pointer transition-colors ${
                selectedProcess?.id === process.id ? 'border-blue-500 bg-blue-500/5' : 'hover:border-slate-600'
              }`}
              onClick={() => setSelectedProcess(process)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white">{process.name}</h3>
                    <p className="text-sm text-slate-400">{process.phone}</p>
                  </div>
                  <Badge className={getStatusColor(process.status)}>
                    {process.status === 'processing' && <RefreshCw className="h-3 w-3 mr-1 animate-spin" />}
                    {process.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Progress</span>
                    <span className="text-sm text-slate-400">{process.progress}%</span>
                  </div>
                  <Progress value={process.progress} className="h-2" />
                </div>

                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-xs text-slate-400">Sources:</span>
                  {process.sources.map((source, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Details */}
      <div className="space-y-6">
        {selectedProcess && (
          <>
            {/* Process Pipeline */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  <span>Enrichment Pipeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['identity', 'contact', 'location', 'demographics', 'complete'].map((stage, index) => {
                    const stages = ['identity', 'contact', 'location', 'demographics', 'complete'];
                    const currentIndex = stages.indexOf(selectedProcess.stage);
                    const isActive = index === currentIndex;
                    const isComplete = index < currentIndex || selectedProcess.stage === 'complete';
                    
                    return (
                      <div key={stage} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          isComplete ? 'border-green-400 bg-green-400/20' : 
                          isActive ? 'border-blue-400 bg-blue-400/20' : 'border-slate-600'
                        }`}>
                          {getStageIcon(stage, isActive, isComplete)}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isComplete ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-slate-400'}`}>
                            {stage.charAt(0).toUpperCase() + stage.slice(1)} Enrichment
                          </p>
                          {isActive && selectedProcess.status === 'processing' && (
                            <div className="flex items-center space-x-2 mt-1">
                              <RefreshCw className="h-3 w-3 animate-spin text-blue-400" />
                              <span className="text-xs text-slate-400">Processing...</span>
                            </div>
                          )}
                        </div>
                        {isComplete && <Check className="h-4 w-4 text-green-400" />}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Enriched Data */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Enriched Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProcess.data.identity && (
                  <div>
                    <h4 className="font-medium text-white mb-2 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Identity</span>
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-300">Name: {selectedProcess.data.identity.fullName}</p>
                      <p className="text-slate-300">Age: {selectedProcess.data.identity.age}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-300">Confidence:</span>
                        <Badge variant="secondary">{selectedProcess.data.identity.confidence}%</Badge>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProcess.data.contact && (
                  <div>
                    <h4 className="font-medium text-white mb-2 flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Contact</span>
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-300">Email: {selectedProcess.data.contact.email}</p>
                      <p className="text-slate-300">Phone: {selectedProcess.data.contact.phone}</p>
                      {selectedProcess.data.contact.alternatePhone && (
                        <p className="text-slate-300">Alt Phone: {selectedProcess.data.contact.alternatePhone}</p>
                      )}
                    </div>
                  </div>
                )}

                {selectedProcess.data.location && (
                  <div>
                    <h4 className="font-medium text-white mb-2 flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-300">{selectedProcess.data.location.address}</p>
                      <p className="text-slate-300">
                        {selectedProcess.data.location.city}, {selectedProcess.data.location.state} {selectedProcess.data.location.zip}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProcess.data.demographics && (
                  <div>
                    <h4 className="font-medium text-white mb-2 flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Demographics</span>
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-300">Occupation: {selectedProcess.data.demographics.occupation}</p>
                      <p className="text-slate-300">Income: {selectedProcess.data.demographics.income}</p>
                      <p className="text-slate-300">Education: {selectedProcess.data.demographics.education}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DataEnrichment;
