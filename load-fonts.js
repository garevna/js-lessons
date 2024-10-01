if ('fonts' in document) {
  Promise.all([
    document.fonts.load('14px Montserrat'),
    document.fonts.load('14px Luckiest Guy'),
    document.fonts.load('16px Happy Monkey'),
    document.fonts.load('14px Poppins'),
    document.fonts.load('13px Roboto')
  ]).then(() => {
    document.documentElement.style.setProperty('--funy-font', 'Happy Monkey')
    document.documentElement.style.setProperty('--main-font', 'Montserrat, Poppins')
    document.documentElement.style.setProperty('--font-family', 'Montserrat, Poppins')
    document.documentElement.style.setProperty('--lang-switcher-font', 'Luckiest Guy')
    document.documentElement.style.setProperty('--welcome-win-font', 'Luckiest Guy')
    document.documentElement.style.setProperty('--donate-button-font', 'Luckiest Guy')
    document.documentElement.style.setProperty('--slogan-font', 'Happy Monkey')

    document.documentElement.style.setProperty('--main-menu-width', '386px')
  })
}
