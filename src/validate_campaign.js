const validCampaigns = [
  'inauguration',
]

module.exports = function validateCampaign(campaign = '') {
  // return false for invalid input
  if (!campaign) return false

  // return the campaign if it's valid
  const valid = validCampaigns.includes(campaign)
  if (valid) return campaign

  // for invalid campaigns, return with prefix 'unknown'
  return `unknown:${campaign}`
}
