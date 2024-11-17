import { useState, useEffect } from 'react';
import { getFactCheck, FactCheck } from '../../services/factCheck';
import { 
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface FactCheckBadgeProps {
  articleId: string;
  showDetails?: boolean;
}

export default function FactCheckBadge({ articleId, showDetails = false }: FactCheckBadgeProps) {
  const [factCheck, setFactCheck] = useState<FactCheck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFactCheck();
  }, [articleId]);

  const fetchFactCheck = async () => {
    try {
      const data = await getFactCheck(articleId);
      setFactCheck(data);
    } catch (error) {
      console.error('Error fetching fact check:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const getBadgeContent = () => {
    switch (factCheck?.status) {
      case 'verified':
        return {
          icon: <CheckBadgeIcon className="h-5 w-5 text-green-500" />,
          text: 'Verified',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      case 'false':
        return {
          icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
          text: 'False',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      case 'misleading':
        return {
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
          text: 'Misleading',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      default:
        return {
          icon: <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />,
          text: 'Unverified',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  const badge = getBadgeContent();

  return (
    <div className="inline-flex flex-col items-start">
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${badge.bgColor} ${badge.textColor}`}>
        {badge.icon}
        <span className="text-sm font-medium">{badge.text}</span>
      </div>
      
      {showDetails && factCheck && (
        <div className="mt-2 text-sm text-gray-600">
          <p className="font-medium">Fact Check Details:</p>
          <p>{factCheck.explanation}</p>
          <div className="mt-1">
            <p className="text-xs">Sources:</p>
            <ul className="list-disc list-inside text-xs">
              {factCheck.sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs mt-1">
            Verified by {factCheck.verifiedBy} on{' '}
            {new Date(factCheck.verificationDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}