if ('fonts' in document) {
  Promise.all([
    document.fonts.load('14px Montserrat'),
    document.fonts.load('14px Luckiest Guy'),
    document.fonts.load('14px Happy Monkey'),
    document.fonts.load('14px Poppins'),
    document.fonts.load('14px Roboto')
  ]).then(() => {
    document.documentElement.style.setProperty('--funy-font', 'Happy Monkey, Comic Sans MS, Textile, cursive')
    document.documentElement.style.setProperty('--main-font', 'Montserrat, Poppins, Sans-Serif')
    document.documentElement.style.setProperty('--font-family', 'Montserrat, Poppins, Sans-Serif')
    document.documentElement.style.setProperty('--lang-switcher-font', 'Luckiest Guy, Poppins, Tahoma')
    document.documentElement.style.setProperty('--welcome-win-font', 'Luckiest Guy, Poppins, Tahoma')
    document.documentElement.style.setProperty('--donate-button-font', 'Luckiest Guy, Poppins, Tahoma')
    document.documentElement.style.setProperty('--slogan-font', 'Happy Monkey, Comic Sans MS, Textile, cursive')

    document.documentElement.style.setProperty('--main-menu-width', '386px')
  })
}
