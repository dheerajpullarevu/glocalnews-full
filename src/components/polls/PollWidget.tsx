import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endDate: string;
  category: string;
}

export default function PollWidget() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'polls'));
      const fetchedPolls = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Poll[];
      setPolls(fetchedPolls);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  const handleVote = async (pollId: string, optionId: string) => {
    if (!user || hasVoted[pollId]) return;

    try {
      const pollRef = doc(db, 'polls', pollId);
      await updateDoc(pollRef, {
        [`options.${optionId}.votes`]: increment(1),
        totalVotes: increment(1)
      });

      setHasVoted(prev => ({ ...prev, [pollId]: true }));
      fetchPolls(); // Refresh polls to show updated results
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const calculatePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <div key={poll.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">{poll.question}</h3>
          
          <div className="space-y-3">
            {poll.options.map((option) => (
              <div key={option.id}>
                {hasVoted[poll.id] ? (
                  <div className="relative">
                    <div
                      className="absolute inset-0 bg-red-100 rounded"
                      style={{
                        width: `${calculatePercentage(option.votes, poll.totalVotes)}%`
                      }}
                    />
                    <div className="relative flex justify-between items-center p-3">
                      <span>{option.text}</span>
                      <span className="font-medium">
                        {calculatePercentage(option.votes, poll.totalVotes)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleVote(poll.id, option.id)}
                    className={`w-full p-3 text-left rounded ${
                      selectedOptions[poll.id] === option.id
                        ? 'bg-red-100 border-red-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {option.text}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <span>{poll.totalVotes} votes</span>
            <span className="mx-2">•</span>
            <span>Ends {new Date(poll.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}