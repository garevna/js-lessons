# ![ico-50 npm] npm

The **npm** package manager is the world’s largest software repository
(around 3 billion downloads per week)

The repository contains over 600,000 packages

Open-source developers around the world use **npm**
to share and borrow packages

_______________________________________________________________________________________________

## ![ico-25 icon] Installation

As **npm** is included with **Node.js**, you need to install [![ico-70 node]](https://nodejs.org)

Next, open a ![ico-25 bash]

___________________________________________________________________________________________________

## ![ico-40 npm] Commands

![ico-20 bash] which npm

![](https://lh6.googleusercontent.com/w65C2Uqbs47V9db_Yn_oR4ui2MUFvFWnl6Yb4riD4zImCTTPUWSLDNXiUD7VuJdl0eQgsK_iLfvTb2kBwLuq64VhDpXYUiTQctg2zbP3Vt-w34LtxtVjY7jHfX4wvY-prbVrtwZBh1UEf5M)

![ico-20 bash] npm --version

![](https://lh6.googleusercontent.com/cP5U5nwO7rgudZfLJCkqvRU9Am4wI7jzAJzz3G0iBG-Rt9pnrV9xpIFqTvcjJk-YgZSYhpe1qOwyqe6YxMdZbKI7HqnczyStJEO2F7Yve01Fcgs2_vio4ExYpaQmGV0TepBGbcvQYIdJ_oM)


![ico-20 bash] npm root

The folder for global package installation

![](createPath("illustrations","npm-root.png"))

_____________________________________________________________________________________________

### ![ico-40 npm] npm init

This command will create the file [**~package.json~**](https://docs.npmjs.com/files/package.json) in the current folder
^^You must first create a new folder for the project and navigate to it^^

![ico-20 warn] **~package.json~** stores the project’s dependencies, i.e. the list of packages required for the project
^^( the required version is specified for each package )^^

^^When creating the **~package.json~** file, **npm** will ask a series of questions about the project,^^
^^which will be located in the current folder^^

^^Your answers will be used to set the values for the following fields:^^

|•| **~name~**        | ^^project name^^ |
|•| **~version~**     | ^^version^^ |
|•| **~description~** | ^^brief description^^ |
|•| **~author~**      | ^^author (you)^^ |
|•| **~repository~**  | ^^link to the project repository^^ |
|•| **~keywords~**    | ^^keywords^^ |
|•| **~scripts~**     | ^^object describing script launch commands using **~npm run~**^^ |

^^^[npm init]

![](https://lh4.googleusercontent.com/ZfltZTmbCAsgDdV4IMmNt92vXLdwU5pLyl446vLzdZ5bfuOVx_GIGW-WP2TtxVLriNWUrhkAn2JnNdmYEUszIiQKNkIsGKiuJEfW4t9c3L2-HnhTYjmTaQwW6vmDb1snqoyQ6w0IcjsvR9E)

^^^

^^As you’ll be able to edit the **~package.json~** file later on,^^
^^you don’t need to worry too much about the initial settings^^ ![ico-20 wink]

_________________________________________________________________________________________________

### ![ico-40 npm] package.json

Now, whenever a package is installed, an entry for that package will be automatically added to the **_~dependencies~_**
of the **~package.json~** file

All packages required for the project will be listed in the sections

| ![ico-20 folder] | **~dependencies~**    | ^^**package dependencies**<br>these packages will be directly included in the application build^^ |
| ![ico-20 folder] | **~devDependencies~** | ^^**packages required during the build phase**<br>these are not embedded in the application itself^^ |

____________________________________________________________________________________________

### ![ico-40 npm] .npmrc

The configuration file from which (along with ~package.json~) npm will read the settings

^^A .npmrc file may exist for each project,^^
^^for each user,^^
^^and globally^^

You can view the default configuration settings using the command

••![ico-20 bash] npm config ls -l••

You can change the settings using the command

••![ico-20 bash] npm config••

For example, to automatically save dependencies:

••![ico-20 bash] npm config set save=true••

and to save dependencies specifying the exact package version:

••![ico-20 bash] npm config set save-exact=true••

___________________________________________________________________________________

### ![ico-40 npm] npm install

In your projects, you’ll use various packages that make life easier ![ico-20 wink]

^^Some of these packages will be needed to build your application,^^
^^its testing, debugging, transpilation, etc.^^
^^These packages will not be included in the application itself^^
^^They will help to build the application^^

^^However, within the application itself, you will use third-party libraries, frameworks, etc.^^
^^These packages will be included in your application’s build^^

^^In short, you need to install all these packages^^

^^To do this, you’ll need the **~npm install~** command^^

___________________________________________________________________________

![ico-20 npm] The **~-g~** option allows you to install a package **globally** so that it is available to all your applications

^^![ico-20 pin] **Global installation of a package** named &lt;package name>:^^

••![ico-20 bash] npm install -g &lt;package name>••

^^![ico-20 pin] **Local installation of a package** named &lt;package name>:^^

••![ico-20 bash] npm install &lt;package name>••

![ico-20 speach] ^^_Local_ – this means the package will be installed in the directory (project folder) you are currently in when you run the command  **~npm~**^^

_____________________________________________________________________________________

![ico-20 npm] When installing packages with the _~--save~_  or _~--save-dev~_

**~npm~**  option, it will add the corresponding entries to the ![ico-20 dir] **~dependencies~**  or  ! [ico-20 dir] **~devDependencies~**

![ico-20 cap] For example, the command

••![ico-20 bash] npm install  -g  css-loader  --save-dev••

^^will install the loader  **~css-loader~**  globally^^
^^and add the corresponding entry to **_~devDependencies~_**^^

_____________________________________________________________________

### ![ico-30 folder] node_modules

All locally installed packages will be located in the ![ico-20 dir] **~node_modules~** folder of the current project

![ico-20 warn] The **~node_modules~** folder must always be added to **~gitignore~**

![ico-30 git] gitignore

![](https://lh6.googleusercontent.com/SLXHR8Om5imjD3M9PUDQeB8WmOoBDYBYZYGxJC1IhdUji_AxJca4r_c9sxL1nK7Ly-naC8DX9vKDaf03a3w2E3zYUxnXeatwEfu8oe0jlGOlfqkO0Fftlrb8JJFoA-odZqTAzbuur3SD_ZQ)

^^No one ever stores the ![ico-20 dir] **~node_modules~** folder in a Git repository,^^
^^however, if you clone the repo,^^
^^it is very easy to install all the necessary packages if the **~package.json~** file is present^^

^^All you need to do is run the console command ![ico-20 bash] ~npm install~,^^
^^and all the packages listed in package.json will be installed^^
^^in accordance with the specified versions^^

_______________________________________________________________________________________________________

### ![ico-40 npm] npm run

Before using this command, you need to make certain changes to the **~package.json~** file

More specifically, in the **_~scripts~_** section:

~~~js
"scripts": {
    "алиас" : "путь_к_файлу_скрипта"
    ...
}
~~~

In this section, we describe the scripts or packages that we will run using the command  ~npm run~

This command runs the specified script

~~~js
"scripts": {
    "start" : "node index.js",
    "build" : "webpack"
}
~~~

_______________________________________________________________________________________

### ![ico-40 npm] npm list

**Displaying a list of installed packages**

To display a list of globally installed packages, use the **~-g~** option

••![ico-20 bash] npm list -g••

![](https://lh6.googleusercontent.com/MCZpi5JBh9OCJmvpvl139V_WNTvFRlhf_qoDsLRh4eETCYDngtEeiuLxiipbaiqfs-zizH5SVgUbKgOpvXMNkoA-88_9TdjKSbp7qBIAb5Px51_x_Z89MpuhJU0UcSvt-Vg-04nHlz2c6s8)

••![ico-20 bash] npm list --depth=0••

To display a brief list (without details for each package), use the **~--depth=0~** option

![](http://icecream.me/uploads/ca3c97a33ec377e15452bfcc82615ab9.png)

__________________________________________________________________________________________________

### ![ico-40 npm] npm search

**Searching for packages**

••![ico-20 bash] npm search babel••

![](https://lh4.googleusercontent.com/oo2pdarDWkeQdqJVNbF8-LI4Z0Ki6DpzQsNyaRdY7zsjKByhVHDNw2t9v2RoUNw1HAUhj6YhlUAX3kYfemfira5X2Zgmp2MYIX0SJXAI0Iviv4LJRUl3DLCoJFirCr9lh3TcnQBEs1sQkRU)

____________________________________________________________________________

### ![ico-40 npm] npm link

**Creating symbolic links**

When you run ~npm link~ in the project’s root folder, **~npm~** creates a symbolic link from your **_~global node_modules~_** directory to the project folder

**~global node_modules~** is a special folder in which all globally installed modules are stored

••![ico-20 bash] npm install -g••

You can find the path to your global directory ~node_modules~ by running

••![ico-20 bash] npm root -g••

^^^[Example 1]

Creating a symbolic link in the global folder ( ** ~** ) to a package in the local folder

Let’s navigate to the folder ~z/home/test/node_modules~ and create a symbolic link to the package **~express~** in the current folder

![](http://icecream.me/uploads/c822230d4ea7d8c23989faa08b7e0533.png)

^^^

^^^[Example 2]

Now let’s navigate to the folder of another project ( _~/z/home/js-samples~_ )
and create a symbolic link there to the package **_express_**,
installed in the folder ( _~/z/home/test/node_modules~_ ),
to which there is a symbolic link from the global folder ( ** ~** )

![](http://icecream.me/uploads/68f176dd4c7535aeb9d3e1fbedfd9830.png)

^^^

![ico-20 warn] The **~link~** command is intended for creating symbolic links to packages only

To remove an established link, use the command:

••![ico-20 bash] npm unlink images••
••![ico-20 bash] ls -al $(npm root -g)••

____________________________________________________________________________________

## ![ico-40 npm] package-lock.json

Every time a new dependency is installed, npm automatically updates the lock file named **_~package-lock.json~_**

**_~package-lock.json~_** is a ‘snapshot’ of the current dependency tree, which accurately describes the folder structure in the ~node_modules~ directory

![warn-25] **_~package-lock.json~_** will never be published, even if you explicitly include it in the build

**_~package-lock.json~_** includes an **_integrity_** field to verify the package’s integrity

^^Specifying a particular package version in **_~package.json~_** fixes only top-level dependencies^^

^^If your application is run on another machine (the user’s), different versions of lower-level packages may be installed, which could cause the application to malfunction^^

^^To ensure that the end user of your application always sees a dependency tree identical to yours at the time of publication, you should use **_~shrinkwrap~_** to create an exact snapshot of these dependencies and publish this snapshot alongside the application^^

![](http://icecream.me/uploads/e5b85cfcb24ca4d34562e1e2ae37ae54.png)

____________________________________________________________________________________________________________________

## ![ico-40 npm] npm shrinkwrap

Every time the application is deployed ( _deploy_ ), Node.js runs **_npm_**

^^Deployment may be significantly delayed due to the installation of new versions of the packages listed in your application’s dependencies^^

^^You can avoid updating dependencies by creating a **_npm-shrinkwrap.json_** file, which locks in the current versions of your application’s dependencies^^

^^The format of this file is identical to that of **_~package-lock.json~_**^^

![warn-25] **_~npm-shrinkwrap.json~_** may be part of a published package

If you run the **~npm shrinkwrap~** command in a folder that already contains **_~package-lock.json~_**,

**npm** will rename **_~package-lock.json~_** to **_~npm-shrinkwrap.json~_**

If both files are present in the project folder, **npm** will use **_~npm-shrinkwrap.json~_** and ignore **_~package-lock.json~_**

[![ico-20 link] npm shrinkwrap](https://javascript.tutorialhorizon.com/2015/03/21/what-is-npm-shrinkwrap-and-when-is-it-needed/)
