## StayWoke Intake SMS Logic

When an SMS is received, we have to determine the user’s intent. This is accomplished using Commands and Flows.

### Commands
Commands live in an object at src/controller/sms/commands.js. Each command is a simple function that corresponds to some word the user sends us.

Some commands simply return a text response. For example, 'schedule' returns a text schedule.

```js
'schedule': (req, res) => {
  res.send(message('Here’s a schedule!'))
},
```

Other commands can trigger a ‘flow’. For example, ‘signup’ starts the signup flow.

```js
'signup': (req, res) => {
  // set the flow name in the session
  req.session.flowName = 'signup'
  // delegate to the flow
  flows.signup.dispatcher(req, res)
},
```

If a user response doesn’t correspond to a command, they might be responding to a flow, or they might be sending us unsolicited gibberish. This is handled by the 'unknown' command.

```js
'unknown': (req, res) => {
  if (req.session.flowName) {
    // user is in a flow, see if it exists and delegate to it
    const flow = flows[req.session.flowName]
    if (flow) {
      flow.dispatcher(req, res)
      return
    }
  }

  // no flow, or flow was invalid
  // tell them what commands they can send us
  const text = 'Sorry, didn’t quite get that. You can say ‘signup’ to join StayWoke, or ‘schedule’ for a list of upcoming events.'
  res.send(message(text))
},
```

### Aliases

We can create aliases for commands by duping them with a new key name. For example, ‘ready’ is

```js
// aliases
commands.ready = commands.signup
```

### Flows

A flow is a series of steps, called in order each time the user responds. See notes in src/controller/sms/signup/signup_dispatcher.js and src/controller/sms/signup/signup_steps.js.
