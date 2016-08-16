Your Mission

Allow a user to input a username and see all GitHub repos for that user (repo name only in this list). This list should be ordered by "popularity" which I have defined like so:

Number of stars plus twice the number of forks plus half the number of open issues
If two repos have the same popularity calculation, then the newer repo should appear first.
Display a button to allow the user to reverse the sorting order
Once you're able to list the repos, create a directive to show repo details on click of a repo name. This must use transcluded content and should appear as a "modal" window over the top of the other content. In that modal, show the repo name, owner, whether the repo is a fork of another one or not, and the popularity calculation.
