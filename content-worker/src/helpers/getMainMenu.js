import { registry } from './registry'

const { mainMenu } = require('../assets').default

/**
 * An entry marked `hidden` stays in the menu file and out of the menu.
 *
 * The homework is all hidden at the moment. The lessons were reordered and the
 * sections redrawn around them, and the homework did not move with them: a
 * task now sits under a topic it no longer belongs to, and some of them ask
 * for things the lesson before them never taught. Deleting the entries would
 * have thrown away the order they go in, which is the part worth keeping —
 * so they are flagged instead, and each comes back by dropping its flag once
 * its content has been brought back in line.
 *
 * The pages themselves are untouched and still answer on their own address.
 */
export async function getMainMenu () {
  const data = await registry()

  // No registry, no filtering: show the menu as written. An entry that leads
  // nowhere is a smaller problem than a menu that has lost half its items.
  const has = (list, ref) => !data || (data[list] || []).includes(ref)

  return mainMenu.map(lesson => ({
    ref: lesson.ref,
    title: lesson[self.lang],
    items: lesson.items
      .filter(item => !item.hidden && has('pages', item.ref))
      .map(item => ({
        ref: item.ref,
        title: item[self.lang],
        translated: has('eng', item.ref) && has('ua', item.ref)
      }))
  }))
}
