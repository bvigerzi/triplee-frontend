import isCI from "is-ci"
import log from "loglevel"
import { globSync } from "glob"
import {exec} from "child_process"

log.setLevel("info")

const BLOG_DIR = "content/blog/"
const HIDDEN_ARTICLE_GLOB = `${BLOG_DIR}_*`

if(!isCI) {
    log.info("Not in CI env, won't remove hidden articles")
    process.exit()
}

const ignoredDirectories = globSync(HIDDEN_ARTICLE_GLOB)
log.info("Removing hidden articles...")
let removedArticleCount = 0
ignoredDirectories.forEach(directory => {
    if(directory.includes(BLOG_DIR)) {
        exec(`rm -rf ${directory}`)
        removedArticleCount++
    }
})
log.info(`Removed ${removedArticleCount} hidden articles`)
