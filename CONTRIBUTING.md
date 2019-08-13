# How to initialize project?

* Clone this repository.
* Run `yarn install`. (Install `yarn` globally.)
* Make sure you have `watchman` installed. (If not, run `brew install watchman`.)

# How to run ExampleApp?

* Run `cd ExampleApp`.
* Run `yarn install`.
* Run `yarn start`.

# How to make a change?

* Supply a proper test case and test your changes in ExampleApp.
* Git commit with [Conventional Commits](https://conventionalcommits.org/).
* Bump version and publish with `npm run release`. This will update `CHANGELOG.md` automatically.

# How to release a beta/test version?

* Run `yarn release:beta`.

# How to release a stable version?

* Run `yarn release`.
