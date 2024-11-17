import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { JobListing } from '../../types/revenue';

export default function JobPortal() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const q = query(
        collection(db, 'jobs'),
        where('status', '==', 'active'),
        orderBy('postedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedJobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobListing[];
      setJobs(fetchedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Job Opportunities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              {job.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <p>{job.company}</p>
              <p>{job.location}</p>
              {job.salary && <p>₹{job.salary}</p>}
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium">Requirements:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Posted {new Date(job.postedAt).toLocaleDateString()}
              </span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}