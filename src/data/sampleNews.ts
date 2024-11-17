import { NewsArticle } from '../types/news';

export const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'పోలవరం ప్రాజెక్టు పనులు వేగవంతం',
    content: 'ఆంధ్రప్రదేశ్ ప్రభుత్వం పోలవరం ప్రాజెక్టు పనులను వేగవంతం చేసింది. వచ్చే ఏడాది జూన్ నాటికి ప్రాజెక్టును పూర్తి చేయాలని లక్ష్యంగా పెట్టుకుంది. ప్రాజెక్టు పూర్తయితే 7 లక్షల ఎకరాలకు సాగునీరు అందించే అవకాశం ఉంది...',
    summary: 'పోలవరం ప్రాజెక్టు పనులు వేగవంతం, 2025 జూన్ నాటికి పూర్తి చేయాలని లక్ష్యం',
    imageUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&auto=format&fit=crop&q=60',
    authorId: 'auth1',
    authorName: 'రాజేష్ కుమార్',
    category: 'Development',
    language: 'te',
    region: 'Andhra Pradesh',
    location: {
      state: 'Andhra Pradesh',
      district: 'West Godavari',
      mandal: 'Polavaram',
      coordinates: {
        latitude: 17.2473,
        longitude: 81.6432
      }
    },
    publishedAt: new Date().toISOString(),
    tags: ['polavaram', 'irrigation', 'development'],
    likes: 345,
    views: 2890,
    featured: true
  },
  {
    id: '2',
    title: 'హైదరాబాద్ మెట్రో విస్తరణ ప్రారంభం',
    content: 'హైదరాబాద్ మెట్రో రైలు ఫేజ్-2 విస్తరణ పనులు ప్రారంభమయ్యాయి. ఎయిర్‌పోర్ట్ వరకు మెట్రో రైలు సేవలు విస్తరించనున్నారు. దీనివల్ల ప్రయాణికులకు మరింత సౌకర్యవంతంగా ఉంటుంది...',
    summary: 'హైదరాబాద్ మెట్రో రైలు ఫేజ్-2 విస్తరణ పనులు ప్రారంభం',
    imageUrl: 'https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?w=800&auto=format&fit=crop&q=60',
    authorId: 'auth2',
    authorName: 'స్వాతి రెడ్డి',
    category: 'Infrastructure',
    language: 'te',
    region: 'Telangana',
    location: {
      state: 'Telangana',
      district: 'Hyderabad',
      mandal: 'Secunderabad',
      coordinates: {
        latitude: 17.3850,
        longitude: 78.4867
      }
    },
    publishedAt: new Date().toISOString(),
    tags: ['metro', 'hyderabad', 'transport'],
    likes: 567,
    views: 3421,
    featured: true
  },
  {
    id: '3',
    title: 'విశాఖ ఐటి హబ్‌గా అభివృద్ధి',
    content: 'విశాఖపట్నంలో కొత్తగా 20 ఐటి కంపెనీలు తమ కార్యకలాపాలను ప్రారంభించనున్నాయి. దీనివల్ల 10,000 మందికి ఉద్యోగ అవకాశాలు లభించనున్నాయి. విశాఖను తెలుగు రాష్ట్రాల రెండవ ఐటి హబ్‌గా అభివృద్ధి చేయాలని ప్రభుత్వం లక్ష్యంగా పెట్టుకుంది...',
    summary: 'విశాఖలో 20 కొత్త ఐటి కంపెనీలు, 10,000 ఉద్యోగాల కల్పన',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60',
    authorId: 'auth3',
    authorName: 'వేణు గోపాల్',
    category: 'Technology',
    language: 'te',
    region: 'Andhra Pradesh',
    location: {
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      mandal: 'Madhurawada',
      coordinates: {
        latitude: 17.7307,
        longitude: 83.3047
      }
    },
    publishedAt: new Date().toISOString(),
    tags: ['it', 'jobs', 'vizag'],
    likes: 890,
    views: 5678,
    featured: true
  }
];

export const addSampleNews = async () => {
  const { collection, addDoc } = await import('firebase/firestore');
  const { db } = await import('../firebase/config');
  
  for (const article of sampleNews) {
    try {
      await addDoc(collection(db, 'articles'), article);
    } catch (error) {
      console.error('Error adding sample news:', error);
    }
  }
};