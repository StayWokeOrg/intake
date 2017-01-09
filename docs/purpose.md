## Project Title
StayWoke Intake

## The goal
To capture the contact information for as many people who are attending a protest as possible, for the purpose of getting them to be more connected and involved in future actions.
  
*DeRay's original pitch:*
Millions of people have shown up to protests over the past year, but we have not maximized an ability to collect any of their information so that we can engage in thoughtful action-oriented follow-up.

During the inauguration people will take action in the street(s) for the first time. *How do we gather information from them in a secure and quick way?* Should we make an app that people download & it becomes the repository? Should we have a phone number that people text? Is there something that we haven't thought about?

## The tool
We've imagined a tool that has three prongs: SMS, web, and app. We've pictured a call from a social media leader or speaker or a poster or whatever else saying:

- "SMS 'woke' to 014081208",
OR
- visit staywoke.org/in and enter your email address,
OR
- download the 'stay woke' app from the iOS or Google Play stores

We haven't talked at all about what the app will do. I'd imagine it's similar to the others--at least, for starters, just take information.

The web site will capture their name and email address (possibly and/or phone number?) and put it into the database.

The SMS tool will capture their name and phone number and put it into the database.

## The challenges
SMS calls to "sign up" have been already made, and seen very little success. Apps are costly to develop and we haven't got much vision for an app, and we're concerned about the viability of asking people to go to a web site--it seems that, in the moment, especially when some people don't have smart phones, SMS is the most reliable option.

So the biggest challenge is: How do we increase the likelihood that a SMS signup campaign will be successful?
  
## Some ideas
Some of the ideas we've had for the SMS campaign's messaging/etc. are:

- Focus on the short term: make it feel like joining community
- Focus on impact: if you want to make in impact in XXXXX way, text XXXXX to XXXXX.
- Make it interactive: make it a back-and-forth with the hope that A) it will feel less weird and impersonal and B) we can get more useful information
- Opt-out but make it easy: if someone engages with the SMS tool, they may be interacting with something short term (e.g. put your message on our twitter stream) but it will also enroll them in the "street team" or whatever the longterm group is called. However, we want to be clear that it's happening and make it easy to opt out.

## The immediate impact
We have thrown out a few ideas about what *immediate* action their signing up could make--to make it feel like it really has impact.

- The back and forth could ask them for a vote, or a message, and it'll be displayed somewhere
- The back and forth could allow them to opt in to be on a petition or list somewhere--"I stand for XXXXX" or "I stand against XXXXX"
- It may be a useful tool for disseminating information during an event--e.g. "Updates on how the march is going", etc.
- DeRay mentioned that there will be trainings in the future, and a wiki about issues--this will give access to these when they're ready

## The future actions
We want this tool to both be useful to those who signup, and then for that usefulness to be communicated as a part of encouraging them to sign up. Two possible future actions that we've thought of are:

- Connect people to others in their area--possibly phone banking in groups
- Connect future calls to action to real world events--e.g. "this thing you care about stopping just happened again; do this action in response"

We also talked about ladders--seems like tiers of involvement/time available.

## Information we're definitely gathering
- Name
- Email or phone number
- The event they're at (?)

## Tools we definitely need to build
- Email and name signup box on a web site (e.g. staywoke.org/in)
- SMS number with a simple back-and-forth signup flow (using Twilio) for SMS signups
- Central database, into which both web site and SMS push data, into which we also import pre-existing email lists
- App (?)

## Tech stack
Node/Express
