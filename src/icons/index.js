import './iconfont'

const svgFiles = import.meta.glob('./svg/*.svg')
for (const path in svgFiles) {
  svgFiles[path]()
}
