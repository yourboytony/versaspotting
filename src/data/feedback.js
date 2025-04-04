// Store feedback in localStorage for persistence
const STORAGE_KEY = 'versa_feedback';

export function saveFeedback(feedback) {
  const feedbacks = getAllFeedback();
  const newFeedback = {
    ...feedback,
    id: Date.now(),
    timestamp: new Date().toISOString()
  };
  feedbacks.push(newFeedback);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
  return newFeedback;
}

export function getAllFeedback() {
  const feedbacks = localStorage.getItem(STORAGE_KEY);
  return feedbacks ? JSON.parse(feedbacks) : [];
}

export function getFeedbackStats() {
  const feedbacks = getAllFeedback();
  const stats = {
    total: feedbacks.length,
    averageRating: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };

  if (feedbacks.length > 0) {
    const totalRating = feedbacks.reduce((sum, feedback) => {
      stats.ratingCounts[feedback.rating]++;
      return sum + feedback.rating;
    }, 0);
    stats.averageRating = (totalRating / feedbacks.length).toFixed(1);
  }

  return stats;
} 