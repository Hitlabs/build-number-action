# build-number-action

GitHub action for capturing a build number with PR merge

# Adding the action to your project

In your repo, create a `.github/workflows` directory if it does not already exist, and add a `build_number.yml` file. Add the following as contents:

```yml
name: Build Number
on:
  pull_request:
    types:
      - opened
    branches:
      - dev
      - beta
      - production
jobs:
  fix-locales:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: generate-build-number
        uses: Hitlabs/build-number-action@main
      - name: Git Commit
        run: |
          git config user.name "<git_user>"
          git config user.email "<git_user_email>"
          git add .
          git commit -m "[GitHubBot]: commit new build number"
          git push
```
