import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  experience: string;
}

const openings = [
  {
    id: '1',
    title: 'Senior Journalist - Politics',
    department: 'Editorial',
    location: 'Delhi',
    type: 'Full-time',
    description: 'Looking for an experienced political journalist to lead our coverage of national politics.',
    requirements: [
      '5+ years of experience in political journalism',
      'Strong network of political contacts',
      'Experience in digital media',
      'Excellent writing skills in English and Hindi'
    ],
    experience: '5+ years'
  },
  {
    id: '2',
    title: 'Regional Content Manager',
    department: 'Content',
    location: 'Hyderabad',
    type: 'Full-time',
    description: 'Manage and grow our Telugu language content team and operations.',
    requirements: [
      'Native Telugu speaker with excellent English',
      '3+ years in content management',
      'Experience leading editorial teams',
      'Understanding of digital media metrics'
    ],
    experience: '3+ years'
  },
  {
    id: '3',
    title: 'Mobile App Developer',
    department: 'Technology',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Join our mobile app development team to build and improve our Android and iOS applications.',
    requirements: [
      'Experience with React Native or NativeScript',
      'Understanding of mobile app architecture',
      'Knowledge of TypeScript',
      'Experience with Firebase'
    ],
    experience: '2+ years'
  },
  {
    id: '4',
    title: 'Sales Manager',
    department: 'Sales',
    location: 'Mumbai',
    type: 'Full-time',
    description: 'Lead our advertising sales team and develop relationships with key clients.',
    requirements: [
      '5+ years in digital media sales',
      'Strong network of advertising contacts',
      'Experience in team management',
      'Proven track record of hitting targets'
    ],
    experience: '5+ years'
  }
];

export default function Careers() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const filteredOpenings = filter === 'all' 
    ? openings 
    : openings.filter(job => job.department.toLowerCase() === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600">
          Help us revolutionize local news delivery across India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Innovation</h3>
          <p className="text-gray-600">
            Work with cutting-edge technology to solve real-world problems in journalism
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Impact</h3>
          <p className="text-gray-600">
            Make a difference in how millions of people consume and interact with news
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Growth</h3>
          <p className="text-gray-600">
            Continuous learning and career development opportunities
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('editorial')}
            className={`px-4 py-2 rounded-md ${
              filter === 'editorial' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            Editorial
          </button>
          <button
            onClick={() => setFilter('technology')}
            className={`px-4 py-2 rounded-md ${
              filter === 'technology' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            Technology
          </button>
          <button
            onClick={() => setFilter('sales')}
            className={`px-4 py-2 rounded-md ${
              filter === 'sales' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            Sales
          </button>
        </div>

        <div className="space-y-6">
          {filteredOpenings.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.department} • {job.location}</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {job.type}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h2>
        <p className="text-gray-600 mb-6">
          We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
        </p>
        <button className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">
          Send Resume
        </button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Benefits & Perks</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏥</div>
            <h3 className="font-semibold mb-2">Health Insurance</h3>
            <p className="text-gray-600">Comprehensive health coverage for you and family</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="font-semibold mb-2">Remote Work</h3>
            <p className="text-gray-600">Flexible work arrangements and WFH options</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="font-semibold mb-2">Learning Budget</h3>
            <p className="text-gray-600">Annual budget for courses and conferences</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-semibold mb-2">Stock Options</h3>
            <p className="text-gray-600">Be a part of our growth journey</p>
          </div>
        </div>
      </div>
    </div>
  );
}