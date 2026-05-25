function readPackage(pkg) {
  if (pkg.name === '@theia/plugin-ext' && pkg.version === '1.71.1') {
    // 官方插件宿主默认声明 AI/MCP 依赖，产品侧不启用时在解析阶段剔除。
    delete pkg.dependencies?.['@theia/ai-mcp'];
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
