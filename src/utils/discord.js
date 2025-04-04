const WEBHOOK_URL = 'https://discord.com/api/webhooks/1357825999240433694/byJnxWkq97uux2rdKDScOUg1EeyGMlQtCmURS5g8_nss8ivuWSZ4t-sk_jQ5frC0i5ft';

export async function sendFeedbackToDiscord(feedback) {
  const stars = '⭐'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
  const timestamp = new Date(feedback.timestamp).toLocaleString();
  
  const embed = {
    title: 'New Feedback Received',
    color: feedback.rating >= 4 ? 0x00ff00 : feedback.rating >= 3 ? 0xffff00 : 0xff0000,
    fields: [
      {
        name: 'Rating',
        value: stars,
        inline: true
      },
      {
        name: 'Date',
        value: timestamp,
        inline: true
      }
    ],
    footer: {
      text: 'VERSA Spotting Feedback System'
    }
  };

  if (feedback.text) {
    embed.fields.push({
      name: 'Feedback',
      value: feedback.text
    });
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send feedback to Discord');
    }

    return true;
  } catch (error) {
    console.error('Error sending feedback to Discord:', error);
    throw error;
  }
} 