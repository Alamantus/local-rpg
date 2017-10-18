# How to contribute

We're really glad you're reading this, because we need volunteer developers to help this project come to fruition.

Please be sure that you follow the [Code of Conduct](./CODE_OF_CONDUCT.md) at all times when contributing to this project.

Here are some important resources:

- [Our projects](https://github.com/Alamantus/local-rpg/projects) tells you where we are and what needs to be done.
- [Our roadmap](https://github.com/Alamantus/local-rpg/wiki/Road-Map) is the 10k foot view of where we're going.
- Slack: Join our [local-rpg Slack workspace](https://join.slack.com/t/local-rpg/shared_invite/enQtMjU4MzI3MjY1MzMyLTU5NGQ2MjI2MTM5ZjVhMWE4NTM4NGVkMDQzODU0YWIxM2RkYWU2MzdmZjIzMWFhYzI1MjIwOWMzNTU4Zjc1YjQ)--It's a free account, so use reactions whenever no response is required.
- [Our wiki](https://github.com/Alamantus/local-rpg/wiki) will be an ever-growing source of information about the app.
- Bugs? [Github Issues](https://github.com/Alamantus/local-rpg/projects/issues) is where to report them.

## Testing

Test suites are cool, but they often hinder a small team. If our contributor pool grows large enough, we might need to start adding them, at which point any help will be much appreciated. Until then, just make sure your contributions work properly before submitting them.

## Submitting changes

*Note:* Before ever making any changes, please be sure you make a pull from the master repo.

Please send a [GitHub Pull Request to local-rpg](https://github.com/Alamantus/local-rpg/compare) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). If you've added a feature, describe what it is and either how to use it (if it's a user-visible feature) or what it does (if the user doesn't need to interact with it). Please follow our coding conventions (below) and make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

```
$ git commit -m "A brief summary of the commit
> 
> A paragraph describing what changed and its impact."
```

## Coding conventions

Start reading our code and you'll get the hang of it. We optimize for readability:

- We indent using two spaces (soft tabs)
- We use ES2016 for our code.
- We use Choo's `html` JavaScript template string wrapper ([bel](https://github.com/shama/bel)) for views.
- We avoid logic in views, putting logic view logic into classes.
- We prefer semicolons in our JavaScript.
- We ALWAYS put spaces after list items and method parameters (`[1, 2, 3]`, not `[1,2,3]`), around operators (`x += 1`, not `x+=1`), and around hash arrows.
- We write comments to explain things that aren't basic (i.e. library code, clever tricks, etc).
- We won't put too many restrictions on you, but just get a sense of the code style and try to emulate it before making changes. Nobody's perfect and even the maintainers miss things, but we at least aim to be consistent.
- We follow the file structure logic. Files for the host app go in the `src/host` directory while client files go in `src/client`. Files shared between host and client go in `src/global`. Views go in the relevant `views` directories and controllers go in `controllers` directories. You get the idea.
- We make sure our code is readable because this is open source software. Consider the people who will read your code, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers the goal is to make the ride as smooth as possible.


_Adapted from the [OpenGovernment contribution guide](https://github.com/opengovernment/opengovernment/blob/master/CONTRIBUTING.md)_
