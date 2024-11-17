import { useState } from 'react';
import { submitFactCheck } from '../../services/factCheck';
import { useAuth } from '../../hooks/useAuth';

interface FactCheckFormProps {
  articleId: string;
  onSubmit?: () => void;
}

export default function FactCheckForm({ articleId, onSubmit }: FactCheckFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: 'unverified' as const,
    sources: [''],
    explanation: '',
    originalClaim: '',
    category: 'other' as const,
    severity: 'medium' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await submitFactCheck({
        articleId,
        verifiedBy: user.id,
        ...formData,
        sources: formData.sources.filter(Boolean)
      });
      onSubmit?.();
    } catch (error) {
      console.error('Error submitting fact check:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same
}