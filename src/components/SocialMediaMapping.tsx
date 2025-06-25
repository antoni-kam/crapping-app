
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  User, 
  ExternalLink, 
  Hash, 
  MapPin, 
  Calendar,
  Heart,
  MessageCircle,
  Share,
  Eye
} from 'lucide-react';

interface SocialProfile {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'snapchat' | 'tiktok' | 'linkedin';
  username: string;
  displayName: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  lastActive: string;
  profileImage: string;
  bio: string;
  location?: string;
  website?: string;
  confidence: number;
  recentPosts: {
    id: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    hashtags: string[];
    location?: string;
  }[];
}

interface SocialMapping {
  id: string;
  name: string;
  phone: string;
  profiles: SocialProfile[];
  totalProfiles: number;
  matchConfidence: number;
  status: 'scanning' | 'analyzing' | 'complete';
}

const SocialMediaMapping: React.FC = () => {
  const [mappings, setMappings] = useState<SocialMapping[]>([]);
  const [selectedMapping, setSelectedMapping] = useState<SocialMapping | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<SocialProfile | null>(null);

  const platforms = {
    facebook: { name: 'Facebook', color: 'bg-blue-600', icon: '📘' },
    twitter: { name: 'Twitter', color: 'bg-sky-500', icon: '🐦' },
    instagram: { name: 'Instagram', color: 'bg-pink-500', icon: '📷' },
    snapchat: { name: 'Snapchat', color: 'bg-yellow-400', icon: '👻' },
    tiktok: { name: 'TikTok', color: 'bg-black', icon: '🎵' },
    linkedin: { name: 'LinkedIn', color: 'bg-blue-700', icon: '💼' }
  };

  const generateMockProfile = (platform: keyof typeof platforms, name: string): SocialProfile => {
    const usernames = {
      facebook: `${name.toLowerCase().replace(' ', '.')}.${Math.floor(Math.random() * 999)}`,
      twitter: `@${name.toLowerCase().replace(' ', '')}_${Math.floor(Math.random() * 999)}`,
      instagram: `${name.toLowerCase().replace(' ', '_')}_${Math.floor(Math.random() * 999)}`,
      snapchat: `${name.toLowerCase().replace(' ', '')}${Math.floor(Math.random() * 999)}`,
      tiktok: `@${name.toLowerCase().replace(' ', '')}.${Math.floor(Math.random() * 999)}`,
      linkedin: `${name.toLowerCase().replace(' ', '-')}-${Math.floor(Math.random() * 999)}`
    };

    const recentPosts = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
      id: `post_${i}`,
      content: [
        "Just had the best day ever! #blessed #life",
        "Can't believe it's already Friday! Time flies 🚀",
        "New adventure begins tomorrow! Excited for what's to come",
        "Thanks everyone for the birthday wishes! ❤️",
        "Beautiful sunset tonight 🌅 #nature #photography"
      ][Math.floor(Math.random() * 5)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 500) + 10,
      comments: Math.floor(Math.random() * 50) + 1,
      shares: Math.floor(Math.random() * 20) + 1,
      hashtags: ['#life', '#blessed', '#family', '#work', '#fun'].slice(0, Math.floor(Math.random() * 3) + 1),
      location: Math.random() > 0.7 ? ['Los Angeles, CA', 'New York, NY', 'Chicago, IL'][Math.floor(Math.random() * 3)] : undefined
    }));

    return {
      id: `${platform}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      platform,
      username: usernames[platform],
      displayName: name,
      followers: Math.floor(Math.random() * 10000) + 100,
      following: Math.floor(Math.random() * 2000) + 50,
      posts: Math.floor(Math.random() * 1000) + 10,
      verified: Math.random() > 0.8,
      lastActive: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString(),
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: [
        "Living life to the fullest ✨",
        "Family first, everything else second ❤️",
        "Adventure seeker | Coffee lover ☕",
        "Making memories one day at a time 📸",
        "Blessed and grateful 🙏"
      ][Math.floor(Math.random() * 5)],
      location: Math.random() > 0.5 ? ['Los Angeles, CA', 'New York, NY', 'Chicago, IL'][Math.floor(Math.random() * 3)] : undefined,
      website: Math.random() > 0.7 ? 'www.example.com' : undefined,
      confidence: Math.floor(Math.random() * 30) + 70,
      recentPosts
    };
  };

  const generateMockMapping = (): SocialMapping => {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Davis', 'David Wilson'];
    const name = names[Math.floor(Math.random() * names.length)];
    const availablePlatforms = Object.keys(platforms) as (keyof typeof platforms)[];
    const numProfiles = Math.floor(Math.random() * 4) + 2;
    const selectedPlatforms = availablePlatforms.slice(0, numProfiles);
    
    const profiles = selectedPlatforms.map(platform => generateMockProfile(platform, name));

    return {
      id: `mapping_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      profiles,
      totalProfiles: profiles.length,
      matchConfidence: Math.floor(Math.random() * 20) + 80,
      status: Math.random() > 0.7 ? 'complete' : Math.random() > 0.4 ? 'analyzing' : 'scanning'
    };
  };

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 3 }, generateMockMapping);
    setMappings(initialData);
    setSelectedMapping(initialData[0]);
    setSelectedProfile(initialData[0].profiles[0]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new mappings occasionally
      if (Math.random() > 0.8) {
        const newMapping = generateMockMapping();
        setMappings(prev => [newMapping, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'analyzing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'scanning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformBadge = (platform: keyof typeof platforms) => {
    const config = platforms[platform];
    return (
      <Badge className={`${config.color} text-white border-transparent`}>
        <span className="mr-1">{config.icon}</span>
        {config.name}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Mappings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Social Media Mappings</h2>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            {mappings.length} Active
          </Badge>
        </div>

        <div className="space-y-3">
          {mappings.map((mapping) => (
            <Card 
              key={mapping.id} 
              className={`bg-slate-800/50 border-slate-700 cursor-pointer transition-colors ${
                selectedMapping?.id === mapping.id ? 'border-purple-500 bg-purple-500/5' : 'hover:border-slate-600'
              }`}
              onClick={() => {
                setSelectedMapping(mapping);
                setSelectedProfile(mapping.profiles[0]);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white">{mapping.name}</h3>
                    <p className="text-sm text-slate-400">{mapping.phone}</p>
                  </div>
                  <Badge className={getStatusColor(mapping.status)}>
                    {mapping.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Profiles Found</span>
                    <span className="text-sm font-medium text-white">{mapping.totalProfiles}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Match Confidence</span>
                    <span className="text-sm font-medium text-white">{mapping.matchConfidence}%</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mapping.profiles.map((profile) => (
                      <span key={profile.id} className="text-xs">
                        {platforms[profile.platform].icon}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Profile Details */}
      <div className="lg:col-span-2 space-y-6">
        {selectedMapping && (
          <>
            {/* Platform Tabs */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-purple-400" />
                    <span>{selectedMapping.name} - Social Profiles</span>
                  </CardTitle>
                  <Badge className={getStatusColor(selectedMapping.status)}>
                    {selectedMapping.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={selectedMapping.profiles[0]?.platform} className="space-y-4">
                  <TabsList className="grid grid-cols-3 lg:grid-cols-6 bg-slate-700">
                    {selectedMapping.profiles.map((profile) => (
                      <TabsTrigger
                        key={profile.platform}
                        value={profile.platform}
                        className="text-xs"
                        onClick={() => setSelectedProfile(profile)}
                      >
                        <span className="mr-1">{platforms[profile.platform].icon}</span>
                        {platforms[profile.platform].name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {selectedProfile && (
                    <TabsContent value={selectedProfile.platform} className="space-y-4">
                      {/* Profile Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center">
                                <User className="h-6 w-6 text-slate-300" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-medium text-white">{selectedProfile.displayName}</h3>
                                  {selectedProfile.verified && (
                                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                                      ✓ Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-400">{selectedProfile.username}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p className="text-slate-300">{selectedProfile.bio}</p>
                              {selectedProfile.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3 text-slate-400" />
                                  <span className="text-slate-400">{selectedProfile.location}</span>
                                </div>
                              )}
                              {selectedProfile.website && (
                                <div className="flex items-center space-x-1">
                                  <ExternalLink className="h-3 w-3 text-slate-400" />
                                  <span className="text-slate-400">{selectedProfile.website}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-400">
                                  Last active: {new Date(selectedProfile.lastActive).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <h4 className="font-medium text-white mb-3">Profile Stats</h4>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <p className="text-lg font-semibold text-white">{selectedProfile.followers.toLocaleString()}</p>
                                <p className="text-xs text-slate-400">Followers</p>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-white">{selectedProfile.following.toLocaleString()}</p>
                                <p className="text-xs text-slate-400">Following</p>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-white">{selectedProfile.posts.toLocaleString()}</p>
                                <p className="text-xs text-slate-400">Posts</p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-300">Match Confidence</span>
                                <Badge variant="secondary">{selectedProfile.confidence}%</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Recent Posts */}
                      <Card className="bg-slate-700/50 border-slate-600">
                        <CardHeader>
                          <CardTitle className="text-lg">Recent Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-64">
                            <div className="space-y-4">
                              {selectedProfile.recentPosts.map((post) => (
                                <div key={post.id} className="border-b border-slate-600 last:border-b-0 pb-4 last:pb-0">
                                  <p className="text-slate-300 mb-2">{post.content}</p>
                                  <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                                    <div className="flex items-center space-x-4">
                                      <div className="flex items-center space-x-1">
                                        <Heart className="h-3 w-3" />
                                        <span>{post.likes}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <MessageCircle className="h-3 w-3" />
                                        <span>{post.comments}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Share className="h-3 w-3" />
                                        <span>{post.shares}</span>
                                      </div>
                                    </div>
                                  </div>
                                  {post.hashtags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {post.hashtags.map((hashtag, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {hashtag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                  {post.location && (
                                    <div className="flex items-center space-x-1 mt-1">
                                      <MapPin className="h-3 w-3 text-slate-400" />
                                      <span className="text-xs text-slate-400">{post.location}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SocialMediaMapping;
