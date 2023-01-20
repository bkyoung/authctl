# authctl

## Design
This tool is an early work in progress that presently targets the needed use-cases, but is written and organized (hopefully) in such a way that it can be easily evolved for future needs as they arise or change.

The main focuses of the tool are:
1. Administrative tasks - `authctl admin` is an api client for a companion server-side graphql api providing quick access to common administrative tasks exposed by the api
1. Standardize obtaining and renewing auth tokens for services protected by a zero trust network for cli use
1. Streamline setup and renewal of signed SSH keys to simplify daily operation for developers in a zero trust environment

The last item is really a frequently performed extension of the second, thus warranted its own subcommand.  Signing SSH keys involves first authenticating to the zero trust Policy Enforcement Point (PEP) (in this tool, Cloudflare Access is playing that role).  Having authenticated with the PEP, if policies allow, a request is passed to Hashicorp Vault's CA service where the authenticated user is checked against additional rules and policies to determine if SSH key signing may occur.  If so, the provided public key is signed according to the policies in place in Vault, and returned to `authctl`, where it gets stored such that future SSH interactions use the signed key when desired.  In the use-case this tooling was written for, the target was Github.  Github was configured to require signed SSH keys, signed by that CA (Vault).  The signed keys have a short lifetime, expiring after 24 hours.

Specific platforms currently targeted:
- Cloudflare Access
- Hashicorp Vault
- Github
- GraphQL for Users and Groups

## Usage
`authctl` is a multi-purpose cli tool for managing auth related tasks

```
$ authctl -h
authctl <command>

Commands:
  authctl admin <command>   administrative tasks
  authctl config <command>  view and manage app configuration
  authctl sign-in           daily sign-in (obtain tokens and ssh cert for the day)
  authctl ssh <command>     create and manage ssh certificates
  authctl token <command>   create and manage auth tokens

Options:
  -h, --help     Show help                                                                 [boolean]
      --version  Show version number                                                       [boolean]
```

### Admin
For common administrative tasks, like user and group administration
```
$ authctl admin -h
authctl admin <command>

administrative tasks

Commands:
  authctl admin group <command>  manage Groups
  authctl admin user <command>   manage Users

Options:
  -h, --help     Show help                                                                 [boolean]
      --version  Show version number                                                       [boolean]
```

#### User
For rapid onboarding and offboarding of users.  It is meant for the most common neeeds, and not intended to be 100% comprehensive for every imaginable case.  Anything not covered can be added, or you can just go to the web ui and do it in those rare cases it's needed.

```
$ authctl admin user -h
authctl admin user <command>

manage Users

Commands:
  authctl admin user create   create new user
  authctl admin user delete   delete user account
  authctl admin user get      retrieve user info
  authctl admin user list     retrieve user info for all users
  authctl admin user suspend  suspend user account
  authctl admin user update   update user account info

Options:
  -h, --help     Show help                                                                 [boolean]
      --version  Show version number                                                       [boolean]
```