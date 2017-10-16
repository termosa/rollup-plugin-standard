import standard from 'standard'
import SnazzyStream from 'snazzy'

const rollupStandardPlugin = () => {
  return {
    name: 'standard',
    transform (code, id) {
      const snazzy = new SnazzyStream
      snazzy.pipe(process.stdout)

      if (id.slice(-3) !== '.js') return null

      // TODO: Add include-exclude filter
      // if (!filter(id)) return null

      const lintResults = standard.lintTextSync(code)

      if (!lintResults.warningCount && !lintResults.errorCount) return

      lintResults.results.forEach(result => {
        if (!result.messages || !result.messages.length) return

        result.messages.forEach(message => {
          snazzy.write(`  ${id}:${message.line}:${message.column}: ${message.message} (${message.ruleId})\n`)
        })
      })

      snazzy.end()
    }
  }
}

export default rollupStandardPlugin
