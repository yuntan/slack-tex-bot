const config = require('./config.json');
const GOOGLE_CHART_API_URL = 'https://chart.googleapis.com/chart?cht=tx&chl=';

/**
 * Responds to HTTP request by Slack /tex command.
 *
 * @example
 * curl -X POST "https://us-central1.your-project-id.cloudfunctions.net/slackTexBot" -d 'token=[YOUR_SLACK_TOKEN]' -d 'user_name=Steve' --data-urlencode 'text=1+1=2'
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.slackTexBot = function slackTexBot(req, res) {
  if (req.method !== 'POST') {
    console.log('only POST requests are acceptable');
    res.status(405).send();
    return;
  } else if (!req.body || req.body['token'] !== config.SLACK_TOKEN) {
    console.log('invalid token');
    res.status(401).send();
    return;
  } else {
    let { user_name, text } = req.body;
    console.log(`user: ${user_name}, text: ${text}`);
    let url = GOOGLE_CHART_API_URL + encodeURIComponent(text);
    res.json({
      'response_type': 'in_channel',
      'attachments': [
        {
          'author_name': user_name,
          'image_url': url,
        },
      ],
    });
    return;
  }
};
