const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const compressing = require('compressing')
const packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'))
let env
let version
min()
//入口函数
function min() {
  env = process.argv[2].split('=')[1]
  versionUp()
}

function versionUp() {
  version = incrementVersion(packageData.version) //版本号
  packageData.version = version
  const updatedPackageJson = JSON.stringify(packageData)
  fs.writeFile('package.json', updatedPackageJson, 'utf8', (err) => {
    if (err) {
      console.error('写入 package.json 文件时发生错误:', err)
      return
    }
    console.log('package.json 文件已成功更新版本号为' + version)
    exec(`pnpm build:${env}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令时出错: ${error}`)
        return
      }
      compress()
    })
  })
}
//移动文件
// function fileChange() {
//   fs.readdir(sourceFolder, (err, files) => {
//     if (err) {
//       console.error('读取源文件夹失败:', err)
//       return
//     }
//     // 遍历源文件夹中的所有文件
//     files.forEach((file) => {
//       const sourceFile = path.join(sourceFolder, file)
//       const targetFile = path.join(targetFolder, file)
//       fs.rename(sourceFile, targetFile, (err) => {
//         if (err) {
//           console.error(`移动文件 ${sourceFile} 到 ${targetFile} 失败:`, err)
//           return
//         } else {
//           console.log(`成功移动文件 ${sourceFile} 到 ${targetFile}`)
//         }
//       })
//     })
//     //删除文件
//     fs.rmdirSync(targetFolder + '/releases', { recursive: true })
//     compress()
//   })
// }

//压缩
function compress() {
  const folderPath = `./dist` // 替换文件夹路径
  const zipStream = new compressing.zip.Stream()
  zipStream.addEntry(folderPath)
  const destStream = fs.createWriteStream(`./dist.zip`)
  zipStream
    .pipe(destStream)
    .on('finish', () => {
      console.log('压缩成功')
      const oldFilePath = './dist.zip'
      const newFilePath = `./${version}_${env}.zip`
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          console.error('文件重命名失败:', err)
        } else {
          console.log('文件重命名成功')
        }
      })
    })
    .on('error', () => {
      console.log('failure')
    })
}

//版本号自增加
function incrementVersion(version) {
  if (env == 'pro') return version
  // 将版本号拆分成数组，按照 '.' 进行分割
  const parts = version.split('.')
  // 将版本号的每个部分转换为整数
  let major = parseInt(parts[0])
  let minor = parseInt(parts[1])
  let patch = parseInt(parts[2])
  // 如果当前版本的补丁号小于 9，则将其加一
  if (patch < 9) {
    parts[2] = (patch + 1).toString()
  } else {
    // 如果当前版本的补丁号已经是 9，且次版本号小于 9，则将次版本号加一，并将补丁号重置为 0
    if (minor < 9) {
      parts[1] = (minor + 1).toString()
      parts[2] = '0'
    } else {
      // 如果当前版本的补丁号和次版本号都是 9，则将主版本号加一，并将次版本号和补丁号都重置为 0
      major++
      parts[0] = major.toString()
      parts[1] = '0'
      parts[2] = '0'
    }
  }

  // 将版本号的每个部分重新组合成字符串，并以 '.' 连接起来
  return parts.join('.')
}
