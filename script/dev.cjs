const { exec } = require('child_process')
let env
const args = process.argv[2]
if (args && args.split('=')) {
  const status = args.split('=')
  env = status[1]
}
process.env.VITE_APP_TYPE = env
exec(`pnpm dev`, (error, stdout, stderr) => {
  console.log(stdout, stderr)
  if (error) {
    console.error(`执行命令时出错: ${error}`)
    return
  }
})
