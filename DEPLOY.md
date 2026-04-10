# SBTI H5 部署指南

## 方案：Fleek + IPFS 手动部署

Fleek 支持直接拖拽上传文件到 IPFS，无需 GitHub。

---

## 部署步骤

### 第一步：注册 Fleek
1. 访问 https://fleek.xyz
2. 用 **GitHub 账号**登录
3. 完成注册

### 第二步：创建站点
1. 点击 **"Add New Site"**
2. 选择 **"Upload manually"**（手动拖拽上传）
3. 将 `sbti-h5/` 文件夹下的 **所有文件** 拖入上传框
4. 等待 IPFS 上传完成（约 1-2 分钟）
5. Fleek 会分配一个 `.fleek.co` 子域名，例如：
   ```
   https://sbti-test.on.fleek.co
   ```
6. 复制这个地址

### 第三步：绑定 optionweb3.sol 域名
1. 打开 https://www.sns.id/zh-Hans/domain/optionweb3
2. 找到 DNS 设置，选择 **"Website"** 类型
3. 在目标地址粘贴 Fleek 分配的 `.fleek.co` 地址
4. 保存

### 第四步：等待生效
- DNS 传播通常 **5分钟～48小时**
- 测试访问 `https://optionweb3.sol`

---

## 文件夹结构（已就绪）

```
sbti-h5/
└── index.html   ← 直接上传这个文件夹内的全部文件
```

---

## 验证部署

打开 Fleek 分配的 `.fleek.co` 地址测试：
- 答题流程是否正常
- 结果页维度图是否显示
- 移动端适配是否OK

---

## 备选方案

如果 Fleek 手动上传遇到问题，可以用 **Cloudflare Pages**：

1. 注册 https://pages.cloudflare.com
2. 直接拖拽上传 `sbti-h5/` 文件夹
3. 获得 `*.pages.dev` 地址
4. 在 sns.id 设置 CNAME 指向该地址

---

## 已完成的工作

- ✅ SBTI H5 单页应用开发（彩色活泼版）
- ✅ 20道题完整数据嵌入
- ✅ 5种人格类型 + 15维度分析
- ✅ 移动端优先响应式设计
- ✅ 分享按钮 + 重新测试