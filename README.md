:sparkles: Tim :memo:
==========

Tim is a time tracker for your terminal

NOTE: This project is in alpha. Things are prone to break.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tim-time.svg)](https://npmjs.org/package/tim-time)
[![Downloads/week](https://img.shields.io/npm/dw/tim-time.svg)](https://npmjs.org/package/tim-time)
[![License](https://img.shields.io/npm/l/tim-time.svg)](https://github.com/epeery/Tim/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tim-time
$ tim COMMAND
running command...
$ tim (-v|--version|version)
tim-time/0.9.1 linux-x64 node-v11.14.0
$ tim --help [COMMAND]
USAGE
  $ tim COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tim add [PROJECT]`](#tim-add-project)
* [`tim help [COMMAND]`](#tim-help-command)
* [`tim note`](#tim-note)
* [`tim projects`](#tim-projects)
* [`tim remove [PROJECT]`](#tim-remove-project)
* [`tim sessions [PROJECT]`](#tim-sessions-project)
* [`tim start [PROJECT]`](#tim-start-project)
* [`tim status`](#tim-status)
* [`tim stop`](#tim-stop)
* [`tim time`](#tim-time)

## `tim add [PROJECT]`

add a new project

```
USAGE
  $ tim add [PROJECT]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ tim add myproject
```

_See code: [src/commands/add.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/add.ts)_

## `tim help [COMMAND]`

display help for tim

```
USAGE
  $ tim help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `tim note`

add note to active project

```
USAGE
  $ tim note

OPTIONS
  -h, --help       show CLI help
  -n, --note=note  note to add

EXAMPLE
  $ tim note -n "This is a note"
```

_See code: [src/commands/note.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/note.ts)_

## `tim projects`

list projects

```
USAGE
  $ tim projects

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ tim projects
```

_See code: [src/commands/projects.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/projects.ts)_

## `tim remove [PROJECT]`

remove a project

```
USAGE
  $ tim remove [PROJECT]

OPTIONS
  -c, --confirm  confirm removal
  -h, --help     show CLI help

EXAMPLE
  $ tim remove myproject
```

_See code: [src/commands/remove/index.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/remove/index.ts)_

## `tim sessions [PROJECT]`

list today's sessions

```
USAGE
  $ tim sessions [PROJECT]

OPTIONS
  -a, --all   display sessions for all projects
  -h, --help  show CLI help
```

_See code: [src/commands/sessions.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/sessions.ts)_

## `tim start [PROJECT]`

start a session

```
USAGE
  $ tim start [PROJECT]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/start.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/start.ts)_

## `tim status`

display current tracking status

```
USAGE
  $ tim status

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/status.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/status.ts)_

## `tim stop`

stop current session

```
USAGE
  $ tim stop

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/stop.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/stop.ts)_

## `tim time`

list past sessions

```
USAGE
  $ tim time

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/time.ts](https://github.com/epeery/tim/blob/v0.9.1/src/commands/time.ts)_
<!-- commandsstop -->
