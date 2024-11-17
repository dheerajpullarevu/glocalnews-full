export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'journalist' | 'user';
  profileImage?: string;
  bio?: string;
  languages: string[];
  regions: string[];
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'suspended' | 'pending';
  type?: 'independent' | 'mediaHouse'; // For journalists
  phoneNumber?: string;
}