# PIXEL CLUB

EHLO.  Welcome to the Pixel Club repository.

## SETTING UP THE ENVIRONMENT

**REQUIREMENTS**

1. Node v4.2 or higher
2. NPM v2.14.7 or higher

**IMPORTANT**: You should always start with a fork of this repository, and avoid pushing updates to the upstream repo (in fact, you technically shouldn't be able to unless you are Greg (hey Greg!)).  [Read up on forking](https://help.github.com/articles/fork-a-repo/) if you've never used it.  Greg and I work on forks too, it helps to make sure the version people are seeing on GitHub is always as bug-free and efficient as possible.

After forking your repo, follow these steps to get up and running.  You'll only have to do this stuff once:

```
git clone git@github.com:[YOUR_ACCOUNT_NAME]/tbg-pixel-club.git
cd tbg-pixel-club
git remote add upstream git@github.com:thebarbariangroup/tbg-pixel-club.git
npm install
```

If there are no errors, you are all done.

## STARTING THE LOCAL ENVIRONMENT

```
gulp
```

Yep. Just run gulp. This will start a local server and open a browser window to it when it's ready.

## WHERE THINGS LIVE

Unless you are implementing a new feature for the environment itself, you should *only make changes to files inside the 'sketches' folder*.  This is where your WebGL and animation experiments should all live, and the repo will come with a number of examples.

## ANATOMY OF A SKETCH

Sketches are very generally defined and flexible at the moment, and really can be just about anything with an index.html file and some javascript and/or css. The default file structure is as follows.  Files with a * are required.

```
./sketches/your-sketch-name

./assets/        -- static assets like css, images, 3d models etc
./src/index.js*  -- this is your main javascript file. It uses browserify to
                    handle javascript dependencies, so you are encouraged to
                    separate your code into different modules and files, and use npm and the ./package.json file to add new third party libraries you need. the environment uses [browserify](http://browserify.org/) as middleware to automatically process your files into a single concatenated js file with sourcemaps. ideally, you shouldn't need to worry about this at all.
./index.html*    -- this file is required, and any sketch with an index.html
                    file will be displayed on the main environment listing
./package.json*  -- use this to include any additional javascript requirements
                    for your sketch using npm. it's also where your sketch's name and description can go, and it's also a handy place for configuration vars your script might need, just require() it!
```

So any new classes you create should go into the ./src folder, and they should be imported to your index.js as needed using CommonJS syntax. If you'd like to learn more about it, [this](https://webpack.github.io/docs/commonjs.html) and [this](http://eng.wealthfront.com/2015/06/16/an-introduction-to-commonjs/) are nice introductions.

## HOW TO MAKE YOUR OWN SKETCHES
The easiest way is to find a sketch that is a good starting point for your idea.  Then simply duplicate the folder it's in and rename it, and update the name and description in your-new-sketch/package.json. Then start writing code! It should immediately show up in the sketch listing at http://localhost:3333/, or at http://localhost:3333/sketches/your-new-sketch/.  Updates to your code should cause the browser to reload automatically.  You can also use the 'blank-sketch' to start with the bare minimum boilerplate code.

## COMMITTING YOUR CODE
It's best to keep your sketches in branches of their own.  It keeps your repo well organized and makes it easy to bring your awesome code back into this repository when you're happy with it.  You are on a fork of your own, though, so feel free to git however your heart desires.

## BRINGING IN UPSTREAM UPDATES
This code is not perfect, and we will be making improvements to the environment and the index pages etc over time.  It's important to make those updates as painless and conflict free as possible.  If you are careful to only work in the sketches/ folder, and only modify code that you have duplicated from existing examples, this process should remain painless:

```
git fetch upstream master
```

Running this will pull the latest updates on the master repository to your local branch, and shouldn't effect any sketches you are working on locally.  You should also re-run 'npm install' after fetching upstream changes, and restart 'gulp' as a matter of course.  The classic 'turn it on and off again' will solve the majority of bugs.

## HOW TO SHARE YOUR SKETCHES
If you've made a sketch you're proud of, or that you think would serves as nice boilerplate code for other sketches, please [submit a pull request](https://help.github.com/articles/using-pull-requests/) and we'll bring it into the master repository.

Or, if you just want to share it with a friend, feel free to just zip the sketch folder and send it to them.  They should be able to just drop it into their own sketches folder and be up and running.  If there are extra libraries required, remember to tell them to run 'npm install' first!

## WHAT TO DO ABOUT BUGS
Tell us!  Create a GitHub issue describing your problem on the master repository and we'll take a look.

## WHAT IF I'M GREAT AND WANT TO FIX BUGS
Please do.  Feel free to take an issue or create a new one, just leave a comment letting us know you're going to work on it.  Do all your work in a branch on your fork.  When the bug is fixed, [submit a pull request](https://help.github.com/articles/using-pull-requests/) to the main repository and we'll merge it in.
