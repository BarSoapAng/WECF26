import { renderToStaticMarkup } from "react-dom/server"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"
import { LoaderContent } from "../components/PageLoader"

export function renderLoader() {
  const sheet = new ServerStyleSheet()
  try {
    const markup = renderToStaticMarkup(sheet.collectStyles(
      <StyleSheetManager namespace="#page-loader"><LoaderContent /></StyleSheetManager>,
    ))
    // Keep this static shell's styles separate from React's client-side stylesheet.
    return { markup, styles: sheet.getStyleTags().replaceAll('data-styled', 'data-loader-styled') }
  } finally {
    sheet.seal()
  }
}
