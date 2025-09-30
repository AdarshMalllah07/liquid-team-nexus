import { Settings, Shield, Users, HelpCircle, Info, ChevronRight, Bell, Eye, Lock, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="glass-panel grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 h-[400px] overflow-y-auto">
            <TabsContent value="general" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4">Appearance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">Show more content in less space</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4">Language & Region</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between cursor-pointer hover:bg-glass-hover p-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-muted-foreground">English (US)</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Control how your information is shared and used across SmartTeam.
                </p>
                <Button variant="outline" size="sm" className="glass-button">
                  View Full Policy
                </Button>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Close Friends
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your close friends list for sharing sensitive content.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 hover:bg-glass-hover rounded-lg">
                    <span>Sarah Johnson</span>
                    <Button size="sm" variant="ghost">Remove</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-glass-hover rounded-lg">
                    <span>Mike Chen</span>
                    <Button size="sm" variant="ghost">Remove</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="glass-button mt-3">
                  Add Friends
                </Button>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Profile Visibility
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Online Status</p>
                      <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Profile Photo</p>
                      <p className="text-sm text-muted-foreground">Display your photo to team members</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Notifications</p>
                      <p className="text-sm text-muted-foreground">Alert for new messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Reminders</p>
                      <p className="text-sm text-muted-foreground">Notify about upcoming tasks</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between cursor-pointer hover:bg-glass-hover p-2 rounded-lg">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between cursor-pointer hover:bg-glass-hover p-2 rounded-lg">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">Manage your active devices</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  About SmartTeam
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="font-medium">2.4.1</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">December 15, 2024</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="glass-button w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="glass-button w-full justify-start">
                    <Info className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="glass-button w-full justify-start">
                    Contact Support
                  </Button>
                </div>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-4">Legal</h3>
                <div className="space-y-2">
                  <button className="text-sm text-primary hover:underline">Terms of Service</button>
                  <br />
                  <button className="text-sm text-primary hover:underline">Privacy Policy</button>
                  <br />
                  <button className="text-sm text-primary hover:underline">Cookie Policy</button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}