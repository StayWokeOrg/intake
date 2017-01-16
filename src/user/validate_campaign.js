const validCampaigns = [
  'in',
]

/**
 * validateCampaign - validate campaign string
 * ensures that any campaign given is valid using the list above
 * if not valid, prefixes it with unknown: so we can do data cleanup on it later
 * e.g. mispellings, etc.
 *
 * @param  {type} campaign = '' description
 * @return {type}               description
 */
module.exports = function validateCampaign(campaign = '') {
  // return false for invalid input
  if (!campaign) return false

  // return the campaign if it's valid
  const valid = validCampaigns.includes(campaign)
  if (valid) return campaign

  // for invalid campaigns, return with prefix 'unknown'
  return `unknown:${campaign}`
}
