import { competitionStreamsFloor, faqFooterFloor, faqNoise } from "../assets"
import {
  heroBackgroundTrees,
  heroFire,
  heroFloor,
  heroGoose,
  heroLeafAndStump,
  heroOrangeLeaf,
  heroSky,
  heroYellowLeaf,
} from "../assets/optimized"

export async function preparePage(page: HTMLElement, onProgress?: (progress: number) => void) {
  // CSS backgrounds need decoding too; they are not included in document.images.
  const sources = [
    heroSky,
    heroBackgroundTrees,
    heroLeafAndStump,
    heroFloor,
    heroFire,
    heroGoose,
    heroOrangeLeaf,
    heroYellowLeaf,
    ...(page.querySelector("#competition") ? [competitionStreamsFloor] : []),
    ...(page.querySelector("#faq") ? [faqFooterFloor, faqNoise] : []),
  ]
  const backgrounds = sources.map(src => {
    const image = new Image()
    image.src = src
    return image
  })
  // Count each URL once: `<img>` and CSS background instances may share assets.
  const imageByUrl = new Map<string, HTMLImageElement>()
  for (const image of [...page.querySelectorAll("img"), ...backgrounds]) {
    imageByUrl.set(image.currentSrc || image.src, image)
  }
  const images = [...imageByUrl.values()]

  const tasks = [...images.map(image => image.decode().catch(() => {
      // A failed request must not block the page or show a broken-image icon.
      image.style.visibility = "hidden"
    }))]
  // Explicitly request both faces before measuring. The display face may not
  // have been requested yet because this is running before Hero renders.
  const fontTasks = [
    document.fonts.load('400 74px "Morfe"'),
    document.fonts.load('400 22px "Host Grotesk"'),
    document.fonts.load('600 22px "Host Grotesk"'),
  ]
  const totalTasks = tasks.length + fontTasks.length
  let completed = 0
  const report = () => onProgress?.(totalTasks ? Math.round(++completed / totalTasks * 100) : 100)
  tasks.forEach(task => { void task.finally(report) })
  fontTasks.forEach(task => { void task.catch(() => undefined).finally(report) })
  await Promise.allSettled([...tasks, ...fontTasks])
}
