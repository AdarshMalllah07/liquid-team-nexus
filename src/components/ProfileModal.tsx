import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-2xl">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">Senior Product Manager</p>
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Available</Badge>
                <Badge variant="outline">Team Lead</Badge>
                <Badge variant="outline">Mentor</Badge>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-semibold mb-3">Contact Information</h3>
            
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>john.doe@company.com</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+1 (555) 123-4567</span>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>Product Team</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined March 2022</span>
            </div>
          </div>
          
          {/* Skills */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Product Strategy</Badge>
              <Badge variant="secondary">User Research</Badge>
              <Badge variant="secondary">Agile/Scrum</Badge>
              <Badge variant="secondary">Data Analysis</Badge>
              <Badge variant="secondary">Stakeholder Management</Badge>
              <Badge variant="secondary">Roadmapping</Badge>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Completed Q4 Product Roadmap</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Reviewed 5 feature requests</span>
                <span className="text-muted-foreground">Yesterday</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Led sprint planning meeting</span>
                <span className="text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}