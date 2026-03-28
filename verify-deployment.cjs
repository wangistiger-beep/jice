#!/usr/bin/env node
/**
 * EdgeOne Pages 部署前验证脚本
 * 用于检查所有必需文件和配置是否正确
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
console.log('========================================');
console.log('  EdgeOne Pages 部署验证');
console.log('========================================\n');

let allPassed = true;

function check(condition, message, errorHint) {
  if (condition) {
    console.log(`✅ ${message}`);
  } else {
    console.log(`❌ ${message}`);
    if (errorHint) {
      console.log(`   提示: ${errorHint}`);
    }
    allPassed = false;
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(projectRoot, filePath));
}

console.log('1. 检查核心配置文件...');
check(fileExists('edgeone.json'), 'edgeone.json 存在', '请确保 edgeone.json 在项目根目录');
check(fileExists('vite.config.js'), 'vite.config.js 存在', '请确保 vite.config.js 在项目根目录');
check(fileExists('index.html'), 'index.html 存在', '请确保 index.html 在项目根目录');
check(fileExists('package.json'), 'package.json 存在', '请确保 package.json 在项目根目录');
console.log('');

console.log('2. 检查源文件...');
check(fileExists('src/main.jsx'), 'src/main.jsx 存在', '请确保 src/main.jsx 存在');
check(fileExists('.edgeoneignore'), '.edgeoneignore 存在', '建议创建 .edgeoneignore 排除不必要的文件');
console.log('');

console.log('3. 检查 edgeone.json 配置...');
if (fileExists('edgeone.json')) {
  try {
    const edgeoneConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'edgeone.json'), 'utf8'));
    check(edgeoneConfig.buildCommand === 'npm run build', 'buildCommand 配置正确', '建议设置 buildCommand 为 "npm run build"');
    check(edgeoneConfig.outputDirectory === 'dist', 'outputDirectory 配置正确', '建议设置 outputDirectory 为 "dist"');
    check(edgeoneConfig.nodeVersion, 'nodeVersion 已配置', '建议配置 nodeVersion 为 "18.20.4"');
  } catch (e) {
    check(false, 'edgeone.json 格式有效', 'edgeone.json 格式错误，请检查 JSON 语法');
  }
}
console.log('');

console.log('4. 检查 vite.config.js 配置...');
if (fileExists('vite.config.js')) {
  const viteConfig = fs.readFileSync(path.join(projectRoot, 'vite.config.js'), 'utf8');
  check(!viteConfig.includes("minify: 'terser'"), '未使用 terser 压缩', 'Vite 8 默认使用 esbuild，请删除 minify: "terser"');
  check(!viteConfig.includes('manualChunks'), '未使用 manualChunks', 'Vite 8 不支持旧版 manualChunks 配置');
  check(viteConfig.includes("base: '/'"), 'base 路径配置正确', '建议设置 base 为 "/"');
  check(viteConfig.includes("outDir: 'dist'"), 'outDir 配置正确', '建议设置 outDir 为 "dist"');
}
console.log('');

console.log('5. 检查 index.html...');
if (fileExists('index.html')) {
  const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  check(indexHtml.includes('/src/main.jsx'), '引用路径正确', '确保引用是 /src/main.jsx (小写，以 / 开头)');
  check(!indexHtml.includes('/src/Main.jsx'), '未使用大写文件名', 'Linux 区分大小写，确保使用 main.jsx');
}
console.log('');

console.log('6. 检查文件名大小写...');
if (fs.existsSync(path.join(projectRoot, 'src'))) {
  const srcFiles = fs.readdirSync(path.join(projectRoot, 'src'));
  check(srcFiles.includes('main.jsx'), 'main.jsx 文件名正确', '确保文件名是 main.jsx (全小写)');
  check(!srcFiles.includes('Main.jsx'), '不存在 Main.jsx', '避免使用大写文件名');
  check(!srcFiles.includes('MAIN.JSX'), '不存在 MAIN.JSX', '避免使用全大写文件名');
}
console.log('');

console.log('7. 检查 package.json 脚本...');
if (fileExists('package.json')) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
    check(pkg.scripts && pkg.scripts.build, 'build 脚本存在', '请在 package.json 中添加 build 脚本');
    check(pkg.scripts && pkg.scripts.dev, 'dev 脚本存在', '建议添加 dev 脚本用于本地开发');
  } catch (e) {
    check(false, 'package.json 格式有效', 'package.json 格式错误');
  }
}
console.log('');

console.log('========================================');
if (allPassed) {
  console.log('🎉 所有检查通过！可以部署到 EdgeOne Pages');
  console.log('');
  console.log('部署方式:');
  console.log('  方式 1: Git 仓库自动部署');
  console.log('  方式 2: 直接上传 dist 文件夹 (推荐，100% 成功)');
  console.log('');
  console.log('详细步骤请参考: EDGEONE_COMPLETE_GUIDE.md');
  process.exit(0);
} else {
  console.log('⚠️  发现问题，请修复后重新运行验证');
  console.log('');
  console.log('详细说明请参考: EDGEONE_COMPLETE_GUIDE.md');
  process.exit(1);
}
