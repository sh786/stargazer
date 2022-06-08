# React Native Engineer Challenge

## Assumptions Made

1. Since I did not want to add GitHub authentication to increase the accetable rate limit, I chose to employ a requirement of > 3 characters to run a search on the GH API, and added debouncing to ensure that we only make the request a max of once per 700ms (not on every character typed)

## What I Would Do Given More Time

1. Write unit tests using Jest & Testing Library (and likely e2e tests using Cypress)
2. Create more core components, which would be smaller, simpler, and more reusable throughout the app
3. Break out the types more -- I chose to convert GitHub repo objects to the stargazer object type
4. Handle loading (skeleton loader), error and empty states in a more user-informative way
5. Add animations (autocomplete expand/collapse, search icon change, enhance the heart's color changes)
6. Support more languages in my color set
7. Look for points to extract small helper logic -> would lead to easier unit testing
8. Add logic to limit the user to 10 favorited repos (this limit should really be returned via a specific response/error from the stargazer API, and then handled with nice UI in the app to explain to a user why they cannot add another favorite)
9. Test on more devices w/ long repo names
10. Style better for web if we are targeting a web app build as well
