/* global $, Campaign */
/* eslint-disable no-var */
/* eslint-disable comma-dangle */

var campaignView = {}

var inauguration = new Campaign(
  {
    id: 'inauguration',
    name: '(Anti) Inauguration',
    description: 'Fill out the form to stay up to date on actions opposing the new administration’s efforts to ruin everything. Already public pressure has reversed the GOP’s attempt to gut the ethics committee. Let’s continue this momentum. We are the majority.',
    domain: 'staywoke/inauguration'
  }
)

campaignView.currentCampaign = inauguration

campaignView.render = function render() {
  $('.campaign-info').append(campaignView.currentCampaign.toHtml($('#campaign-info-template')))
}

campaignView.render()
